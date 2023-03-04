import { ClockData } from './clock-data';

export class Clock {
  clockData: ClockData;

  constructor(clockData = new ClockData()) {
    this.clockData = clockData;
  }

  increment(clock: ClockData) {
    this.clockData.m += clock.m;
  }
}
