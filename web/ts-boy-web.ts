import { GameboyEmulator } from '../lib/gameboy-emulator.js';
import { WebRenderer } from './web-renderer.js';
import {
  DEBUG,
  DISPLAY_HEIGHT,
  DISPLAY_WIDTH,
  FRAME_LENGTH_IN_M,
  KEY_MAPPING,
  ROMS,
} from '../lib/constants.js';
import { GameboyCpu } from '../lib/gameboy-cpu.js';
import { Memory } from '../lib/memory.js';
import { Clock } from '../lib/clock.js';
import { GameboyGpu } from '../lib/gameboy-gpu.js';
import { ClockData } from '../lib/clock-data.js';
import { Input } from '../lib/input.js';
import { WebButtonInputHandler } from './web-button-input.js';
import { WebKeyboardInputHandler } from './web-keyboard-input.js';
import { Register16, Register8 } from '../lib/registers.js';

const PAUSE_TEXT = 'Pause';
const RESUME_TEXT = 'Resume';

let gameboyEmulator: GameboyEmulator;
let dataCanvas: HTMLCanvasElement;
let gameCanvas: HTMLCanvasElement;
const buttons: Record<string, HTMLButtonElement> = {};
let romSelect: HTMLSelectElement;
const romCache: Map<string, Uint8Array> = new Map();
let romFileInput: HTMLInputElement;
let modeSelect: HTMLSelectElement;
let fpsCheckbox: HTMLInputElement;
let fpsText: HTMLElement;
let pauseButton: HTMLButtonElement;
const input = new Input();

async function main() {
  if (gameboyEmulator) {
    await gameboyEmulator.stop();
  }

  const romName = (romSelect[romSelect.selectedIndex] as HTMLOptionElement)
    .value;

  const renderer = new WebRenderer({ dataCanvas, gameCanvas });

  const rom = await getRom(romName);

  const biosResponse = await fetch('../lib/dmg_boot.bin');
  const biosBuffer = await biosResponse.arrayBuffer();
  const bios = new Uint8Array(biosBuffer);

  const memory = new Memory(bios, rom);
  input.memory = memory;

  const clock = new Clock(new ClockData(), FRAME_LENGTH_IN_M);

  const cpu = new GameboyCpu({ memory, clock });

  const gpu = new GameboyGpu({ imageData: renderer.image.data, memory, clock });

  gameboyEmulator = new GameboyEmulator({
    cpu,
    gpu,
    clock,
    renderer,
  });

  debug();

  await gameboyEmulator.run();
}

function debug() {
  if (!DEBUG) return;

  gameboyEmulator.cpu.registers.setByte(Register8.A, 0x01);
  gameboyEmulator.cpu.registers.setByte(Register8.F, 0xb0);
  gameboyEmulator.cpu.registers.setByte(Register8.B, 0x00);
  gameboyEmulator.cpu.registers.setByte(Register8.C, 0x13);
  gameboyEmulator.cpu.registers.setByte(Register8.D, 0x00);
  gameboyEmulator.cpu.registers.setByte(Register8.E, 0xd8);
  gameboyEmulator.cpu.registers.setByte(Register8.H, 0x01);
  gameboyEmulator.cpu.registers.setByte(Register8.L, 0x4d);
  gameboyEmulator.cpu.registers.setWord(Register16.SP, 0xfffe);
  gameboyEmulator.cpu.registers.setWord(Register16.PC, 0x0100);

  gameboyEmulator.cpu.memory.unloadBios();

  gameboyEmulator.cpu.log();
}

function initUi() {
  dataCanvas = document.createElement('canvas');
  dataCanvas.width = DISPLAY_WIDTH;
  dataCanvas.height = DISPLAY_HEIGHT;

  gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!gameCanvas) {
    throw new Error('There is no canvas to render the game');
  }

  for (const key of Object.values(KEY_MAPPING)) {
    const button = document.getElementById(
      `${key}-button`,
    ) as HTMLButtonElement;
    if (!button) {
      throw new Error(`Input button '${key}' has not been found`);
    }

    buttons[key] = button;
  }

  const buttonInputHandler = new WebButtonInputHandler(input, buttons);
  const webKeyboardInputHandler = new WebKeyboardInputHandler(input);

  const runButton = document.getElementById('run-button');
  if (!runButton) {
    throw new Error(`Run button has not been found`);
  }

  romSelect = document.getElementById('rom-select') as HTMLSelectElement;
  if (!romSelect) {
    throw new Error(`Rom select has not been found`);
  }

  for (const rom of ROMS) {
    const option = document.createElement('option');
    option.value = rom;
    option.text = getRomName(rom);
    romSelect.appendChild(option);
  }

  runButton.addEventListener('click', main);

  romFileInput = document.getElementById('rom-file-input') as HTMLInputElement;
  if (!romFileInput) {
    throw new Error(`File input for a rom has not been found`);
  }

  romFileInput.addEventListener('change', loadRom);

  modeSelect = document.getElementById('mode-select') as HTMLSelectElement;
  if (!modeSelect) {
    throw new Error(`Mode select has not been found`);
  }

  fpsCheckbox = document.getElementById('fps-checkbox') as HTMLInputElement;
  if (!fpsCheckbox) {
    throw new Error(`Show FPS checkbox has not been found`);
  }

  fpsCheckbox.addEventListener('change', drawFps);

  fpsText = document.getElementById('fps-text') as HTMLInputElement;
  if (!fpsText) {
    throw new Error(`Show FPS text has not been found`);
  }

  pauseButton = document.getElementById('pause-button') as HTMLButtonElement;
  if (!pauseButton) {
    throw new Error(`Pause button has not been found`);
  }

  pauseButton.addEventListener('click', pauseRom);
}

async function loadRom() {
  if (!romFileInput.files || !romFileInput.files[0]) {
    return;
  }
  const romFile = romFileInput.files[0];
  const romBuffer = await romFile.arrayBuffer();
  const rom = new Uint8Array(romBuffer);
  const romName = romFile.name;
  romCache.set(romName, rom);

  const option = document.createElement('option');
  option.value = romName;
  option.text = getRomName(romName);
  option.selected = true;
  romSelect.appendChild(option);
}

async function pauseRom() {
  if (pauseButton.textContent === PAUSE_TEXT) {
    pauseButton.innerText = RESUME_TEXT;
    await gameboyEmulator.stop();
    if (DEBUG) {
      console.log(gameboyEmulator.cpu.operationLogs.join('\n'));
      console.log(gameboyEmulator.cpu.stateLogs.join('\n'));
    }
  } else {
    pauseButton.innerText = PAUSE_TEXT;
    await gameboyEmulator.run();
  }
}

function drawFps() {
  const renderer = gameboyEmulator.renderer as WebRenderer;
  renderer.shouldDrawFps = fpsCheckbox.checked;
}

function getRomName(rom: string) {
  let start = rom.lastIndexOf('/') + 1;

  let end = rom.lastIndexOf('.');
  if (end === -1) {
    end = rom.length;
  }

  return rom.substring(start, end);
}

async function getRom(romName: string) {
  const cachedRom = romCache.get(romName);
  if (cachedRom) {
    return cachedRom;
  }

  const romResponse = await fetch(romName);
  const romBuffer = await romResponse.arrayBuffer();
  const rom = new Uint8Array(romBuffer);
  romCache.set(romName, rom);

  return rom;
}

initUi();
main();
