import { GameboyCpu } from './gameboy-cpu.js';
import { Clock } from './clock.js';
import { GameboyGpu } from './gameboy-gpu.js';
import { Timer } from './timer.js';

export interface Renderer {
  draw: () => void;
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

  run() {
    do {
      const clockData = this.cpu.step();
      this.#gpu.step();
      this.#timer.step(clockData);

      this.#clock.increment(clockData);
    } while (!this.#clock.hasReset);

    this.renderer.draw();

    if (!this.#isStopped) {
      requestAnimationFrame(() => this.run());
    }
  }

  stop() {
    this.#isStopped = true;
  }
}
