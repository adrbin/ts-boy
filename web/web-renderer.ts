import { Clock } from '../lib/clock';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH, RGBA_SIZE } from '../lib/constants';
import { Display } from '../lib/display';
import { Renderer } from '../lib/gameboy-emulator';

export interface WebRendererParams {
  canvas: HTMLCanvasElement;
}

export class WebRenderer implements Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  y = 0;
  image: ImageData;

  constructor({ canvas }: WebRendererParams) {
    this.canvas = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas is uninitialized.');
    }
    this.ctx = ctx;
    this.image = this.ctx.createImageData(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    this.reset();
  }

  init: () => void | Promise<void>;
  draw() {}

  reset() {
    for (let i = 0; i < this.image.width * this.image.height * RGBA_SIZE; i++) {
      this.image.data[i] = 0;
    }

    this.ctx.putImageData(this.image, 0, 0);
  }
}
