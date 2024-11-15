export const KILOBYTE = 2 ^ 10;
export const MEMORY_SIZE = 64 * KILOBYTE;
export const PROGRAM_START = 512;
export const BYTE_LENGTH = 8;
export const WORD_LENGTH = 16;
export const REGISTER_COUNT = 16;
export const FLAG_REGISTER = REGISTER_COUNT - 1;
export const FPS = 60;
export const FRAME_TIME_IN_MS = Math.ceil(1000 / FPS);
export const ONE_SECOND_IN_MS = 1000;
export const INPUT_DELAY = 100;
export const DELAY_FACTOR = 10;

export const DISPLAY_WIDTH = 160;
export const DISPLAY_HEIGHT = 144;
export const RGBA_SIZE = 4;
export const FRAME_LENGTH = 70224;
export const FRAME_LINE_LENGTH = 456;
export const OAM_SCAN_LENGTH = 80;
export const DRAWING_LENGTH = 172;
export const VBLANK_HEIGHT = 10;
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

export const KEY_MAPPING: { [key: string]: number } = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 0xc,
  q: 4,
  w: 5,
  e: 6,
  r: 0xd,
  a: 7,
  s: 8,
  d: 9,
  f: 0xe,
  z: 0xa,
  x: 0,
  c: 0xb,
  v: 0xf,
};

export const ROMS = [
  'roms/chip-8/chip8-test-suite.ch8',
  'roms/chip-8/1dcell.ch8',
  'roms/chip-8/flightrunner.ch8',
  'roms/chip-8/pumpkindressup.ch8',
  'roms/chip-8/RPS.ch8',
  'roms/chip-8/snake.ch8',
  'roms/schip/blackrainbow.ch8',
  'roms/schip/dodge.ch8',
  'roms/schip/eaty.ch8',
  'roms/schip/mondrian.ch8',
  'roms/schip/octogon.ch8',
  'roms/schip/rockto.ch8',
  'roms/schip/sens8tion.ch8',
  'roms/schip/sub8.ch8',
];
