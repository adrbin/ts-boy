import { ClockData } from './clock-data';

export class Clock {
  clockData: ClockData;
  didReset = false;
  max?: number;

  constructor(clockData = new ClockData(), max?: number) {
    this.clockData = clockData;
    this.max = max;
  }

  get value() {
    return this.clockData.m;
  }

  set value(value: number) {
    this.clockData.m = value;
  }

  reset() {
    this.clockData.m = 0;
  }

  increment(clock: ClockData) {
    this.clockData.m += clock.m;

    if (this.max !== undefined && this.value >= this.max) {
      this.value %= this.max;
      this.didReset = true;
    }

    this.didReset = false;
  }
}
