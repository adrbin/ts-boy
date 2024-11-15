import { Clock } from './clock';
import { ClockData } from './clock-data';
import {
  DISPLAY_HEIGHT,
  DISPLAY_WIDTH,
  FRAME_LINE_LENGTH,
  OAM_SCAN_LENGTH,
  DRAWING_LENGTH,
  RGBA_SIZE,
  TILE_DATA_ADDRESS,
  TILE_SIZE,
  TILE_LENGTH,
  WORD_LENGTH,
  BYTE_LENGTH,
  TILE_MAP1_ADDRESS,
  TILE_MAP0_ADDRESS,
  OAM_ADDRESS,
  OAM_SIZE,
  OAM_COUNT,
  FRAME_LENGTH,
  TILE_MAP_LENGTH,
} from './constants';
import { LcdControl, LcdControls, Memory, Stat } from './memory';
import {
  getEnumValuesToNumericObject,
  getNthBit,
  getNthBitFlag,
} from './utils';

export enum Mode {
  HBlank = 0,
  VBlank = 1,
  OamScan = 2,
  Drawing = 3,
}

export interface GpuParams {
  data: Uint8ClampedArray;
  memory: Memory;
}

enum OamFlag {
  GcbPalette = 0,
  Bank = 3,
  DmgPalette = 4,
  XFlip = 5,
  YFlip = 6,
  Priority = 7,
}

type OamFlags = Record<OamFlag, number>;

interface Oam {
  y: number;
  x: number;
  tileIndex: number;
  flags: OamFlags;
}

const colors = [
  [170, 204, 66, 255],
  [152, 188, 60, 255],
  [65, 112, 45, 255],
  [23, 61, 12, 255],
];

export class GameboyGpu {
  clock = new Clock(new ClockData(), FRAME_LENGTH);
  mode = Mode.OamScan;
  data: Uint8ClampedArray;
  memory: Memory;

  constructor({ data, memory }: GpuParams) {
    this.data = data;
    this.memory = memory;
  }

  reset() {
    for (let i = 0; i < DISPLAY_WIDTH * DISPLAY_HEIGHT * RGBA_SIZE; i++) {
      this.data[i] = 0;
    }
  }

  step() {
    this.#checkMode();
    this.#setStats();
  }

  get dot() {
    return this.clock.value % FRAME_LINE_LENGTH;
  }

  get y() {
    return Math.floor(this.clock.value / FRAME_LINE_LENGTH);
  }

  #checkMode() {
    if (this.clock.didReset) {
      this.mode = Mode.HBlank;
      this.reset();
      return;
    }

    if (this.y >= DISPLAY_HEIGHT) {
      this.mode = Mode.VBlank;
      return;
    }

    if (this.dot >= DRAWING_LENGTH) {
      if (this.mode === Mode.Drawing) {
        this.#renderLine();
      }

      this.mode = Mode.HBlank;
      return;
    }

    if (this.dot >= OAM_SCAN_LENGTH) {
      this.mode = Mode.Drawing;
    }
  }

  #setStats() {
    this.memory.ly = this.y;
    this.memory.setStats({
      [Stat.LycFlag]: this.memory.lyc === this.memory.ly,
      [Stat.ModeFlagBit0]: getNthBitFlag(this.mode, 0),
      [Stat.ModeFlagBit1]: getNthBitFlag(this.mode, 1),
    });
  }

  #renderLine() {
    const row = new Uint8ClampedArray(DISPLAY_WIDTH);
    const lcdControls = this.memory.getLcdControls();

    if (lcdControls[LcdControl.LcdEnable]) {
      this.#drawBackground(row, lcdControls);
      this.#drawSprites(row, lcdControls);
      this.#drawWindow(row, lcdControls);
    }

    this.#drawRow(row);
  }

  #drawBackground(row: Uint8ClampedArray, lcdControls: LcdControls) {
    if (!lcdControls[LcdControl.BgEnable]) {
      return;
    }

    const palette = this.memory.bgp;

    let tileData: number[];
    for (let x = 0; x < DISPLAY_WIDTH; x++) {
      const tileX = x & 7;
      if (tileX === 0) {
        let tileIndex = this.#getBackgroundTileIndex(x, lcdControls);
        if (tileIndex < 128 && lcdControls[LcdControl.BgTileDataArea]) {
          tileIndex += 256;
        }

        const tileLine = (this.y + this.memory.scy) & 7;
        tileData = this.#getTileData(tileIndex, tileLine);
      }

      const colorIndex = this.#getColorIndex(tileData!, tileX, palette);
      row[x] = colorIndex;
    }
  }

  #drawWindow(row: Uint8ClampedArray, lcdControls: LcdControls) {
    if (!lcdControls[LcdControl.WindowEnable] || this.y < this.memory.wy) {
      return;
    }

    const palette = this.memory.bgp;
    const windowX = this.memory.wx - (TILE_LENGTH - 1);
    const windowY = this.memory.wy;

    let tileData: number[];
    for (let x = 0; x < DISPLAY_WIDTH; x++) {
      if (x < windowX) {
        continue;
      }

      const tileX = x & (TILE_LENGTH - 1);
      if (tileX === 0) {
        let tileIndex = this.#getWindowTileIndex(
          x,
          windowX,
          windowY,
          lcdControls,
        );

        if (tileIndex < 128 && lcdControls[LcdControl.BgTileDataArea]) {
          tileIndex += 256;
        }

        const tileLine = (this.y + this.memory.scy) & (TILE_LENGTH - 1);
        tileData = this.#getTileData(tileIndex, tileLine);
      }

      const colorIndex = this.#getColorIndex(tileData!, tileX, palette);
      row[x] = colorIndex;
    }
  }

  #drawSprites(row: Uint8ClampedArray, lcdControls: LcdControls) {
    if (!lcdControls[LcdControl.ObjEnable]) {
      return;
    }

    const palette = this.memory.bgp;
    const objSize = lcdControls[LcdControl.ObjSize];

    for (let i = 0; i < OAM_COUNT; i++) {
      const oam = this.#getOam(i);
      const oamY = oam.y - 16;
      const oamX = oam.y - 8;
      const oamHeight = objSize ? 2 * TILE_LENGTH : TILE_LENGTH;

      if (this.y >= oamY && this.y <= oamY + oamHeight) {
        continue;
      }

      const priority = oam.flags[OamFlag.Priority];
      const yFlip = oam.flags[OamFlag.YFlip];
      const xFlip = oam.flags[OamFlag.XFlip];

      const tileIndex = objSize ? oam.tileIndex & 0xfe : oam.tileIndex;
      const tileLine = this.y - oamY;
      const transformedTileLine =
        yFlip === 0 ? tileLine : TILE_LENGTH - tileLine;
      const tileData = this.#getTileData(tileIndex, transformedTileLine);

      for (let tileX = 0; tileX < TILE_LENGTH; tileX++) {
        const x = oamX + tileX;
        if (x < 0 || x >= DISPLAY_WIDTH) break;

        if (priority === 0 || row[x + tileX] === 0) {
          const transformedTileX = xFlip === 0 ? tileX : TILE_LENGTH - tileX;
          const colorIndex = this.#getColorIndex(
            tileData,
            transformedTileX,
            palette,
          );
          row[x + tileX] = colorIndex;
        }
      }
    }
  }

  #getColorIndex(tileData: number[], tileX: number, palette: number[]) {
    const pixel = tileData[tileX];
    const colorIndex = palette[pixel];
    return colorIndex;
  }

  #drawRow(row: Uint8ClampedArray) {
    for (let x = 0; x < DISPLAY_WIDTH; x++) {
      const color = colors[row[x]];

      for (let i = 0; i < RGBA_SIZE; i++) {
        this.data[x * RGBA_SIZE + i] = color[i];
      }
    }
  }

  #getBackgroundTileIndex(x: number, lcdControls: LcdControls) {
    const tileX =
      this.#getTileCoordinateFromPixel(x + this.memory.scx) &
      (TILE_MAP_LENGTH - 1);
    const tileY = this.#getTileCoordinateFromPixel(
      (this.y + this.memory.scy) & (TILE_MAP_LENGTH - 1),
    );
    const tileMapAddress = lcdControls[LcdControl.BgTileMapArea]
      ? TILE_MAP1_ADDRESS
      : TILE_MAP0_ADDRESS;

    const address = tileMapAddress + tileX + tileY * TILE_MAP_LENGTH;
    const tileIndex = this.memory.getByte(address);

    return tileIndex;
  }

  #getTileData(index: number, tileLine: number) {
    const address =
      TILE_DATA_ADDRESS + index * TILE_SIZE + tileLine * WORD_LENGTH;
    const word = this.memory.getWord(address);

    const tileData: number[] = [];
    for (let i = 0; i < TILE_LENGTH; i++) {
      tileData[i] =
        getNthBit(word, BYTE_LENGTH - i) + getNthBit(word, WORD_LENGTH - i) * 2;
    }

    return tileData;
  }

  #getWindowTileIndex(
    x: number,
    windowX: number,
    windowY: number,
    lcdControls: LcdControls,
  ) {
    const tileX = this.#getTileCoordinateFromPixel(x - windowX);
    const tileY = this.#getTileCoordinateFromPixel(this.y - windowY);
    const tileMapAddress = lcdControls[LcdControl.WindowTileMapArea]
      ? TILE_MAP1_ADDRESS
      : TILE_MAP0_ADDRESS;

    const address = tileMapAddress + tileX + tileY * TILE_MAP_LENGTH;
    const tileIndex = this.memory.getByte(address);

    return tileIndex;
  }

  #getOam(index: number): Oam {
    const address = OAM_ADDRESS + index * OAM_SIZE;

    return {
      y: this.memory.getByte(address),
      x: this.memory.getByte(address + 1),
      tileIndex: this.memory.getByte(address + 2),
      flags: getEnumValuesToNumericObject<OamFlags>(
        OamFlag,
        this.memory.getByte(address + 3),
      ),
    };
  }

  #getTileCoordinateFromPixel(pixel: number) {
    return pixel >> 3;
  }
}
