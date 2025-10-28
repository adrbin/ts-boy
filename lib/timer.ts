import { Clock } from "./clock.js";
import { ClockData } from "./clock-data.js";
import { DIV_FREQUENCY, Interrupt, TIMA_FREQUENCIES } from "./constants.js";
import { Memory } from "./memory.js";
import { toByte } from "./utils.js";

export class Timer {
    #memory: Memory;
    #divClockData = new Clock(DIV_FREQUENCY);
    #timaClockData = new Clock();

    constructor(memory: Memory) {
        this.#memory = memory;
    }

    step(clockData: ClockData) {
        this.#incrementDiv(clockData);
        this.#incrementTima(clockData);
    }

    #incrementDiv(clockData: ClockData) {
        this.#divClockData.increment(clockData);

        if (this.#divClockData.hasReset) {
            this.#memory.div = toByte(this.#memory.div + 1);
        }
    }

    #incrementTima(clockData: ClockData) {
        const tac = this.#memory.tac;
        if (!tac.enabled) {
            return;
        }

        this.#timaClockData.max = TIMA_FREQUENCIES[tac.clockSelect];
        this.#timaClockData.increment(clockData);

        if (!this.#timaClockData.hasReset) {
            return;
        }

        if (this.#memory.tima === 0xff) {
            this.#memory.tima = this.#memory.tma;
            this.#memory.setIf({ [Interrupt.Timer]: true });

            console.log(tac);
            console.log(this.#memory.getIf());
            return;
        }

        this.#memory.tima = toByte(this.#memory.tima + 1);

    }
}