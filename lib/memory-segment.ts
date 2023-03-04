import {
  getHigherByte,
  getLowerByte,
  isByte,
  isWord,
  joinBytes,
} from './utils';

export interface IMemorySegment {
  start: number;
  length: number;
  get end(): number;
  hasRelativeAddress(address: number): boolean;
  getByteRelative: (address: number) => number;
  getWordRelative: (address: number) => number;
  setByteRelative: (address: number, value: number) => void;
  setWordRelative: (address: number, value: number) => void;
  getByteAbsolute: (address: number) => number;
  getWordAbsolute: (address: number) => number;
  setByteAbsolute: (address: number, value: number) => void;
  setWordAbsolute: (address: number, value: number) => void;
}

export class MemorySegment implements IMemorySegment {
  start: number;
  length: number;
  #array: Uint8Array;

  constructor(
    start: number,
    length: number,
    data: Uint8Array | undefined = undefined,
  ) {
    this.start = start;
    this.length = length;
    this.#array = data ?? new Uint8Array(length);
  }

  get end() {
    return this.start + this.length - 1;
  }

  hasRelativeAddress(address: number) {
    return address >= this.start && address <= this.end;
  }

  getByteRelative(address: number) {
    const relativeAddress = address - this.start;
    return this.getByteAbsolute(relativeAddress);
  }

  getWordRelative(address: number) {
    const relativeAddress = address - this.start;
    return this.getWordAbsolute(relativeAddress);
  }

  setByteRelative(address: number, value: number) {
    const relativeAddress = address - this.start;
    this.setByteAbsolute(relativeAddress, value);
  }

  setWordRelative(address: number, value: number) {
    const relativeAddress = address - this.start;
    this.setWordAbsolute(relativeAddress, value);
  }

  getByteAbsolute(address: number) {
    this.#checkMemoryBounds(address);

    return this.#array[address];
  }

  getWordAbsolute(address: number) {
    this.#checkMemoryBounds(address);
    this.#checkMemoryBounds(address + 1);

    return joinBytes(this.#array[address], this.#array[address + 1]);
  }

  setByteAbsolute(address: number, value: number) {
    this.#checkMemoryBounds(address);
    this.#checkByte(address, value);

    this.#array[address] = value && 0xff;
  }

  setWordAbsolute(address: number, value: number) {
    this.#checkMemoryBounds(address);
    this.#checkMemoryBounds(address + 1);
    this.#checkWord(address, value);

    this.#array[address] = getLowerByte(value);
    this.#array[address + 1] = getHigherByte(value);
  }

  #checkMemoryBounds(address: number) {
    if (address < 0 || address >= this.length) {
      throw new Error(`Out of memory address: ${address}`);
    }
  }

  #checkByte(address: number, value: number) {
    if (!isByte(value)) {
      throw new Error(
        `Byte overflow attempted to be written to the memory: ${value} at the address: ${address}`,
      );
    }
  }

  #checkWord(address: number, value: number) {
    if (!isWord(value)) {
      throw new Error(
        `Word overflow attempted to be written to the memory: ${value} at the address: ${address}`,
      );
    }
  }
}
