import { FRAME_TIME_IN_MS } from './constants.js';
import { delay } from './utils.js';
import { GameboyCpu } from './gameboy-cpu.js';
import { Clock } from './clock.js';
import { GameboyGpu } from './gameboy-gpu.js';
import { Timer } from './timer.js';

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
  renderer: Renderer;
  gpu: GameboyGpu;
  clock: Clock;
  timer: Timer;
}

export class GameboyEmulator {
  cpu: GameboyCpu;
  renderer: Renderer;
  #gpu: GameboyGpu;
  #clock: Clock;
  #timer: Timer;
  #isStopped = false;

  constructor({ cpu, renderer, gpu, clock, timer }: GameboyEmulatorParams) {
    this.cpu = cpu;
    this.renderer = renderer;
    this.#gpu = gpu;
    this.#clock = clock;
    this.#timer = timer;
  }

  async run() {
    this.#isStopped = false;

    while (!this.#isStopped) {
      const loopStart = Date.now();

      const clockData = this.cpu.step();
      this.#gpu.step();
      this.#timer.step(clockData);

      this.#clock.increment(clockData);

      if (this.#clock.hasReset || this.cpu.isHalted) {
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
