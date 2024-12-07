import {
  DISPLAY_HEIGHT,
  DISPLAY_WIDTH,
  ONE_SECOND_IN_MS,
} from '../lib/constants.js';
import { Renderer } from '../lib/gameboy-emulator.js';

export interface WebRendererParams {
  dataCanvas: HTMLCanvasElement;
  gameCanvas: HTMLCanvasElement;
  fpsText?: HTMLElement;
}

export class WebRenderer implements Renderer {
  #dataCanvas: HTMLCanvasElement;
  #gameCanvas: HTMLCanvasElement;
  #dataCtx: CanvasRenderingContext2D;
  #gameCtx: CanvasRenderingContext2D;
  image: ImageData;

  shouldDrawFps = false;
  #fpsText?: HTMLElement;
  #fpsTimestamp = Date.now();
  #fpsCounter = 0;

  constructor({ dataCanvas, gameCanvas }: WebRendererParams) {
    this.#dataCanvas = dataCanvas;
    this.#gameCanvas = gameCanvas;

    const dataCtx = dataCanvas.getContext('2d');
    if (!dataCtx) {
      throw new Error('Canvas is uninitialized.');
    }
    this.#dataCtx = dataCtx;

    const gameCtx = gameCanvas.getContext('2d');
    if (!gameCtx) {
      throw new Error('Canvas is uninitialized.');
    }
    this.#gameCtx = gameCtx;

    this.image = this.#dataCtx.createImageData(DISPLAY_WIDTH, DISPLAY_HEIGHT);
  }

  draw() {
    this.#dataCtx.putImageData(this.image, 0, 0);
    this.#gameCtx.drawImage(
      this.#dataCanvas,
      0,
      0,
      this.#gameCanvas.width,
      this.#gameCanvas.height,
    );

    this.#drawFps();
  }

  #drawFps() {
    if (!this.shouldDrawFps) {
      return;
    }

    this.#fpsCounter++;

    const now = Date.now();
    const timeDifference = now - this.#fpsTimestamp;

    if (timeDifference < ONE_SECOND_IN_MS) {
      return;
    }

    this.#fpsText!.textContent = this.#formattedFpsCounter;

    this.#fpsTimestamp = now;
    this.#fpsCounter = 0;
  }

  get #formattedFpsCounter() {
    return this.#fpsCounter.toString().padStart(2, '0');
  }
}
