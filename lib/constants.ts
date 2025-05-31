export const DEBUG = true;

export const KILOBYTE = 2 ^ 10;
export const MEMORY_SIZE = 64 * KILOBYTE;
export const PROGRAM_START = 512;
export const BYTE_LENGTH = 8;
export const WORD_LENGTH = 16;
export const REGISTER_COUNT = 16;
export const FLAG_REGISTER = REGISTER_COUNT - 1;
export const FPS = 60;
export const FRAME_TIME_IN_MS = Math.floor(1000 / FPS);
export const ONE_SECOND_IN_MS = 1000;
export const INPUT_DELAY = 100;
export const DELAY_FACTOR = 10;

export const DISPLAY_WIDTH = 160;
export const DISPLAY_HEIGHT = 144;
export const RGBA_SIZE = 4;
export const FRAME_LINE_LENGTH = 456;
export const VBLANK_HEIGHT = 10;
export const FRAME_LENGTH =
  (DISPLAY_HEIGHT + VBLANK_HEIGHT) * FRAME_LINE_LENGTH;
export const TFACTOR = 4;
export const FRAME_LENGTH_IN_M = FRAME_LENGTH / TFACTOR;
export const OAM_SCAN_LENGTH = 80;
export const DRAWING_LENGTH = 172;
export const TILE_LENGTH = 8;
export const TILE_SIZE = 16;
export const OAM_COUNT = 40;
export const OAM_SIZE = 4;
export const TILE_MAP_LENGTH = 32;

export const LCD_CONTROL_ADDRESS = 0xff40;
export const SCY_ADDRESS = 0xff42;
export const SCX_ADDRESS = 0xff43;
export const WY_ADDRESS = 0xff4a;
export const WX_ADDRESS = 0xff4b;
export const LY_ADDRESS = 0xff44;
export const LYC_ADDRESS = 0xff45;
export const STAT_ADDRESS = 0xff41;
export const BGP_ADDRESS = 0xff47;
export const OBP0_ADDRESS = 0xff48;
export const OBP1_ADDRESS = 0xff49;
export const TILE_DATA_ADDRESS = 0x8000;
export const TILE_MAP0_ADDRESS = 0x9800;
export const TILE_MAP1_ADDRESS = 0x9c00;
export const OAM_ADDRESS = 0xfe00;
export const INPUT_ADDRESS = 0xff00;
export const IE_ADDRESS = 0xffff;
export const IF_ADDRESS = 0xff0f;

export enum Interrupt {
  VBlank = 0,
  Stat = 1,
  Timer = 2,
  Serial = 3,
  Joypad = 4,
}

export type Interrupts = Record<Interrupt, boolean>;

export const INTERRUPT_ADDRESS_MAPPING = {
  [Interrupt.VBlank]: 0x40,
  [Interrupt.Stat]: 0x48,
  [Interrupt.Timer]: 0x50,
  [Interrupt.Serial]: 0x58,
  [Interrupt.Joypad]: 0x60,
};

export const KEY_MAPPING: { [key: string]: string } = {
  ArrowUp: 'Up',
  ArrowLeft: 'Left',
  ArrowDown: 'Down',
  ArrowRight: 'Right',
  a: 'A',
  s: 'B',
  ' ': 'Start',
  c: 'Select',
};

export const ROMS = [
  'roms/01-special.gb',
  'roms/cpu_instrs.gb',
  'roms/tetris.gb',
];
