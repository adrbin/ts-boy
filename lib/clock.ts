import { ClockData } from './clock-data.js';

export class Clock {
  max?: number;
  #clockData: ClockData;
  hasReset = false;

  constructor(max?: number, clockData = new ClockData()) {
    this.max = max;
    this.#clockData = clockData;
  }

  get m() {
    return this.#clockData.m;
  }

  get t() {
    return this.#clockData.t;
  }

  set m(value: number) {
    this.#clockData.m = value;
  }

  reset() {
    this.m = 0;
  }

  increment(clock: ClockData) {
    this.m += clock.m;

    if (this.max !== undefined && this.m >= this.max) {
      this.m %= this.max;
      this.hasReset = true;
      return;
    }

    this.hasReset = false;
  }
}
