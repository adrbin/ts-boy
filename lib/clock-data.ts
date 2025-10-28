import { TFACTOR } from "./constants.js";

export class ClockData {
  m = 0;

  constructor(m = 0) {
    this.m = m;
  }

  get t() {
    return this.m * TFACTOR;
  }

  static empty() {
    return new ClockData();
  }

  get isEmpty() {
    return this.m === 0;
  }

  add(clockData: ClockData) {
    return new ClockData(this.m + clockData.m);
  }
}
