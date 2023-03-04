export class ClockData {
  m = 0;

  constructor(m = 0) {
    this.m = m;
  }

  get t() {
    return this.m * 4;
  }
}
