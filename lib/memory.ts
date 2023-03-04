import { IMemorySegment, MemorySegment } from './memory-segment';
import { MemorySegmentMirror } from './memory-segment-mirror';

export class Memory {
  #rom1 = new MemorySegment(0, 0x4000);
  #rom2 = new MemorySegment(0x4000, 0x4000);
  #vram = new MemorySegment(0x8000, 0x2000);
  #eram = new MemorySegment(0xa000, 0x2000);
  #wram = new MemorySegment(0xa000, 0x2000);
  #echoram = new MemorySegmentMirror(0xe000, 0x1e00, this.#wram);
  #oam = new MemorySegment(0xe000, 0x1e00);
  #io = new MemorySegment(0xff00, 0x80);
  #hram = new MemorySegment(0xff80, 0x80);

  #memorySegments: IMemorySegment[] = [
    this.#rom1,
    this.#rom2,
    this.#vram,
    this.#eram,
    this.#wram,
    this.#echoram,
    this.#oam,
    this.#io,
    this.#hram,
  ];

  getByte(address: number) {
    const memorySegment = this.#getMemorySegment(address);
    return memorySegment.getByteRelative(address);
  }

  getWord(address: number) {
    const memorySegment = this.#getMemorySegment(address);
    return memorySegment.getWordRelative(address);
  }

  setByte(address: number, value: number) {
    const memorySegment = this.#getMemorySegment(address);
    memorySegment.setByteRelative(address, value);
  }

  setWord(address: number, value: number) {
    const memorySegment = this.#getMemorySegment(address);
    memorySegment.setWordAbsolute(address, value);
  }

  #getMemorySegment(address: number) {
    const memorySegment = this.#memorySegments.filter(ms =>
      ms.hasRelativeAddress(address),
    )[0];

    if (!memorySegment) {
      throw new Error(`Out of memory address: ${address}`);
    }

    return memorySegment;
  }
}
