import { ClockData } from './clock-data.js';

export class Clock {
  #clockData: ClockData;
  hasReset = false;
  max?: number;

  constructor(clockData = new ClockData(), max?: number) {
    this.#clockData = clockData;
    this.max = max;
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
