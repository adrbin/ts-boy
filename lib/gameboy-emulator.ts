import { FRAME_LENGTH, FRAME_TIME_IN_MS } from './constants.js';
import { delay } from './utils.js';
import { GameboyCpu } from './gameboy-cpu.js';
import { Clock } from './clock.js';
import { GameboyGpu } from './gameboy-gpu.js';
import { ClockData } from './clock-data.js';

export interface Renderer {
  draw: () => Promise<void> | void;
}

export interface Audio {
  play: () => void;
  stop: () => void;
}

export type InputCallback = () => Set<string>;
export type WaitInputCallback = () => Promise<number>;
export type CancelWaitInputCallback = () => void;

export interface Storage {
  save: (data: any) => Promise<void> | void;
  load: () => Promise<any> | any;
}

export interface GameboyEmulatorParams {
  cpu: GameboyCpu;
  gpu: GameboyGpu;
  clock: Clock;
  renderer: Renderer;
}

export class GameboyEmulator {
  #cpu: GameboyCpu;
  #gpu: GameboyGpu;
  #clock = new Clock(new ClockData(), FRAME_LENGTH);
  renderer: Renderer;
  #isStopped = false;

  constructor({ cpu, gpu, clock, renderer }: GameboyEmulatorParams) {
    this.#cpu = cpu;
    this.#gpu = gpu;
    this.#clock = clock;
    this.renderer = renderer;
  }

  async run() {
    this.#isStopped = false;

    while (!this.#cpu.isHalted && !this.#isStopped) {
      const loopStart = Date.now();

      const clockData = this.#cpu.step();
      this.#gpu.step();

      this.#clock.increment(clockData);

      if (this.#clock.hasReset) {
        await this.renderer.draw();
        const msSinceLoopStart = Date.now() - loopStart;
        const remainingMsInFrame = Math.max(
          0,
          FRAME_TIME_IN_MS - msSinceLoopStart,
        );
        await delay(remainingMsInFrame);
      }
    }
  }

  async stop() {
    this.#isStopped = true;
    await delay();
  }
}
