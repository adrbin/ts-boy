import { DELAY_FACTOR, FRAME_TIME_IN_MS } from './constants';
import { delay } from './utils';
import { GameboyEmulator } from './gameboy-emulator';
import { Display } from './display';

export interface Renderer {
  init: () => Promise<void> | void;
  draw: (display: Display) => Promise<void> | void;
}

export interface Audio {
  play: () => void;
  stop: () => void;
}

export interface ChipTsParams {
  vm: GameboyEmulator;
  renderer: Renderer;
  audio: Audio;
}

export class VmRunner {
  vm: GameboyEmulator;
  renderer: Renderer;
  audio: Audio;
  isStopped = false;

  constructor({ vm, renderer, audio }: ChipTsParams) {
    this.vm = vm;
    this.renderer = renderer;
    this.audio = audio;
  }

  async run() {
    this.isStopped = false;
    await this.renderer.init();

    let i = 0;

    while (!this.vm.isHalted && !this.isStopped) {
      await this.vm.executeInstruction();

      await this.renderer.draw(this.vm.display);

      if (i === 0) {
        await delay();
      }

      i = (i + 1) % DELAY_FACTOR;
    }
  }

  async stop() {
    this.isStopped = true;
    await delay();
  }
}
