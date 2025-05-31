export class ClockData {
  m = 0;

  constructor(m = 0) {
    this.m = m;
  }

  get t() {
    return this.m * 4;
  }

  static empty() {
    return new ClockData(0);
  }

  get isEmpty() {
    return this.m === 0;
  }

  add(clockData: ClockData) {
    return new ClockData(this.m + clockData.m);
  }
}
