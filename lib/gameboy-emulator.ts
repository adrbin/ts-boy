import { FRAME_LENGTH, FRAME_TIME_IN_MS } from './constants';
import { delay } from './utils';
import { Display } from './display';
import { GameboyCpu } from './gameboy-cpu';
import { Clock } from './clock';
import { GameboyGpu } from './gameboy-gpu';
import { ClockData } from './clock-data';

export interface Renderer {
  init: () => Promise<void> | void;
  draw: (display: Display) => Promise<void> | void;
}

export interface Audio {
  play: () => void;
  stop: () => void;
}

export interface GameboyEmulatorParams {
  cpu: GameboyCpu;
  clock: Clock;
  renderer: Renderer;
  audio: Audio;
}

export class VmRunner {
  cpu: GameboyCpu;
  gpu: GameboyGpu;
  clock = new Clock(new ClockData(), FRAME_LENGTH);
  renderer: Renderer;
  audio: Audio;
  isStopped = false;

  constructor({ cpu, clock, renderer, audio }: GameboyEmulatorParams) {
    this.cpu = cpu;
    this.clock = clock;
    this.renderer = renderer;
    this.audio = audio;
  }

  async run() {
    this.isStopped = false;
    await this.renderer.init();

    let i = 0;

    while (!this.cpu.isHalted && !this.isStopped) {
      const clockData = this.cpu.step();
      this.gpu.step();

      this.clock.increment(clockData);

      if (this.clock.didReset) {
        await this.renderer.draw(this.cpu.display);
        await delay(FRAME_TIME_IN_MS);
      }
    }
  }

  async stop() {
    this.isStopped = true;
    await delay();
  }
}
