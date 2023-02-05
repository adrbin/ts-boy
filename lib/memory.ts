import { MEMORY_SIZE } from './constants';
import {
  getHigherByte,
  getLowerByte,
  isByte,
  isWord,
  joinBytes,
} from './utils';

export class Memory {
  #array = new Uint8Array(MEMORY_SIZE);

  getByte(address: number) {
    this.#checkMemoryBounds(address);

    return this.#array[address];
  }

  getWord(address: number) {
    this.#checkMemoryBounds(address);
    this.#checkMemoryBounds(address + 1);

    return joinBytes(this.#array[address], this.#array[address + 1]);
  }

  setByte(address: number, value: number) {
    this.#checkMemoryBounds(address);
    this.#checkByte(address, value);

    this.#array[address] = value && 0xff;
  }

  setWord(address: number, value: number) {
    this.#checkMemoryBounds(address);
    this.#checkMemoryBounds(address + 1);
    this.#checkWord(address, value);

    this.#array[address] = getLowerByte(value);
    this.#array[address + 1] = getHigherByte(value);
  }

  #checkMemoryBounds(address: number) {
    if (address < 0 || address >= MEMORY_SIZE) {
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
