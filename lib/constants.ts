export const KILOBYTE = 2 ^ 10;
export const MEMORY_SIZE = 64 * KILOBYTE;
export const PROGRAM_START = 512;
export const BYTE_SIZE = 256;
export const BYTE_LENGTH = 8;
export const REGISTER_COUNT = 16;
export const FLAG_REGISTER = REGISTER_COUNT - 1;
export const FPS = 60;
export const FRAME_TIME_IN_MS = Math.ceil(1000 / FPS);
export const ONE_SECOND_IN_MS = 1000;
export const INPUT_DELAY = 100;
export const DELAY_FACTOR = 10;

export const DISPLAY_WIDTH = 64;
export const DISPLAY_HEIGHT = 32;

export const HIGH_RES_DISPLAY_WIDTH = 128;
export const HIGH_RES_DISPLAY_HEIGHT = 64;

export const FONT_DATA = [
  0xf0, 0x90, 0x90, 0x90, 0xf0, 0x20, 0x60, 0x20, 0x20, 0x70, 0xf0, 0x10, 0xf0,
  0x80, 0xf0, 0xf0, 0x10, 0xf0, 0x10, 0xf0, 0x90, 0x90, 0xf0, 0x10, 0x10, 0xf0,
  0x80, 0xf0, 0x10, 0xf0, 0xf0, 0x80, 0xf0, 0x90, 0xf0, 0xf0, 0x10, 0x20, 0x40,
  0x40, 0xf0, 0x90, 0xf0, 0x90, 0xf0, 0xf0, 0x90, 0xf0, 0x10, 0xf0, 0xf0, 0x90,
  0xf0, 0x90, 0x90, 0xe0, 0x90, 0xe0, 0x90, 0xe0, 0xf0, 0x80, 0x80, 0x80, 0xf0,
  0xe0, 0x90, 0x90, 0x90, 0xe0, 0xf0, 0x80, 0xf0, 0x80, 0xf0, 0xf0, 0x80, 0xf0,
  0x80, 0x80,
];

export const FONT_DATA_START = 0;
export const LARGE_FONT_DATA_START = FONT_DATA.length;

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
