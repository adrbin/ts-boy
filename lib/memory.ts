import {
  BGP_ADDRESS,
  LCD_CONTROL_ADDRESS,
  LYC_ADDRESS,
  LY_ADDRESS,
  OBP0_ADDRESS,
  OBP1_ADDRESS,
  SCX_ADDRESS,
  SCY_ADDRESS,
  STAT_ADDRESS,
  WX_ADDRESS,
  WY_ADDRESS,
} from './constants';
import { IMemorySegment, MemorySegment } from './memory-segment';
import { MemorySegmentMirror } from './memory-segment-mirror';
import { getEnumValues, getEnumValuesToFlagObject, setNthBit } from './utils';

export enum LcdControl {
  BgEnable = 0,
  ObjEnable = 1,
  ObjSize = 2,
  BgTileMapArea = 3,
  BgTileDataArea = 4,
  WindowEnable = 5,
  WindowTileMapArea = 6,
  LcdEnable = 7,
}

export type LcdControls = Record<LcdControl, boolean>;

export enum Stat {
  ModeFlagBit0 = 0,
  ModeFlagBit1 = 1,
  LycFlag = 2,
  HBlankInterrupt = 3,
  VBlankInterrupt = 4,
  OamInterrupt = 5,
  LycInterrupt = 6,
}

export type Stats = Record<Stat, boolean>;

export class Memory {
  isBiosLoaded = true;
  bios: MemorySegment;
  rom = new MemorySegment(0, 0x8000);
  #vram = new MemorySegment(0x8000, 0x2000);
  #eram = new MemorySegment(0xa000, 0x2000);
  #wram = new MemorySegment(0xa000, 0x2000);
  #echoram = new MemorySegmentMirror(0xe000, 0x1e00, this.#wram);
  #oam = new MemorySegment(0xe000, 0x1e00);
  #io = new MemorySegment(0xff00, 0x80);
  #hram = new MemorySegment(0xff80, 0x80);

  #memorySegments: IMemorySegment[];

  constructor(bios: Uint8Array, rom: Uint8Array | undefined = undefined) {
    this.bios = new MemorySegment(0, 0x100, bios);
    this.rom = new MemorySegment(0, 0x8000, rom);
    this.#memorySegments = [
      this.bios,
      this.rom,
      this.#vram,
      this.#eram,
      this.#wram,
      this.#echoram,
      this.#oam,
      this.#io,
      this.#hram,
    ];
  }

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

  getLcdControls() {
    const byte = this.getByte(LCD_CONTROL_ADDRESS);
    const lcdControls = getEnumValuesToFlagObject<LcdControls>(
      LcdControl,
      byte,
    );

    return lcdControls;
  }

  getStats() {
    const byte = this.getByte(STAT_ADDRESS);
    const stats = getEnumValuesToFlagObject<Stats>(Stat, byte);
    return stats;
  }

  setStats(flags: Partial<Stats>) {
    let byte = this.getByte(STAT_ADDRESS);

    for (const flag of getEnumValues(Stat)) {
      const value = flags[flag];
      if (value !== undefined) {
        byte = setNthBit(byte, flag, value);
      }
    }

    this.setByte(STAT_ADDRESS, byte);
  }

  get scy() {
    return this.getByte(SCY_ADDRESS);
  }

  get scx() {
    return this.getByte(SCX_ADDRESS);
  }

  get wy() {
    return this.getByte(WY_ADDRESS);
  }

  get wx() {
    return this.getByte(WX_ADDRESS);
  }

  get ly() {
    return this.getByte(LY_ADDRESS);
  }

  set ly(byte: number) {
    this.setByte(LY_ADDRESS, byte);
  }

  get lyc() {
    return this.getByte(LY_ADDRESS);
  }

  get bgp() {
    const byte = this.getByte(BGP_ADDRESS);
    return this.#getPalette(byte);
  }

  get obp0() {
    const byte = this.getByte(OBP0_ADDRESS);
    return this.#getPalette(byte);
  }

  get obp1() {
    const byte = this.getByte(OBP1_ADDRESS);
    return this.#getPalette(byte);
  }

  #getPalette(byte: number) {
    return [byte & 3, (byte >> 2) & 3, (byte >> 4) & 3, (byte >> 6) & 3];
  }

  #getMemorySegment(address: number) {
    let memorySegment = this.#memorySegments.filter(ms =>
      ms.hasRelativeAddress(address),
    )[0];

    if (!memorySegment) {
      throw new Error(`Out of memory address: ${address}`);
    }

    if (memorySegment === this.bios && !this.isBiosLoaded) {
      memorySegment = this.rom;
    }

    return memorySegment;
  }
}
