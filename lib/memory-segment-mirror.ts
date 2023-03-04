import { IMemorySegment } from './memory-segment';

export class MemorySegmentMirror implements IMemorySegment {
  start: number;
  length: number;
  #memorySegment: IMemorySegment;

  constructor(start: number, length: number, memorySegment: IMemorySegment) {
    this.start = start;
    this.length = length;
    this.#memorySegment = memorySegment;
  }

  get end() {
    return this.start + this.length - 1;
  }

  hasRelativeAddress(address: number) {
    return address >= this.start && address <= this.end;
  }

  getByteRelative(address: number) {
    const relativeAddress = address - this.start;
    return this.#memorySegment.getByteAbsolute(relativeAddress);
  }

  getWordRelative(address: number) {
    const relativeAddress = address - this.start;
    return this.#memorySegment.getWordAbsolute(relativeAddress);
  }

  setByteRelative(address: number, value: number) {
    const relativeAddress = address - this.start;
    this.#memorySegment.setByteAbsolute(relativeAddress, value);
  }

  setWordRelative(address: number, value: number) {
    const relativeAddress = address - this.start;
    this.#memorySegment.setWordAbsolute(relativeAddress, value);
  }

  getByteAbsolute(address: number) {
    return this.#memorySegment.getByteAbsolute(address);
  }

  getWordAbsolute(address: number) {
    return this.#memorySegment.getWordAbsolute(address);
  }

  setByteAbsolute(address: number, value: number) {
    this.#memorySegment.setByteAbsolute(address, value);
  }

  setWordAbsolute(address: number, value: number) {
    this.#memorySegment.setWordAbsolute(address, value);
  }
}
