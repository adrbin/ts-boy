import {
  DISPLAY_HEIGHT,
  DISPLAY_WIDTH,
  MEMORY_SIZE,
  PROGRAM_START,
  REGISTER_COUNT,
} from './constants';
import { Display } from './display';
import { getHigherNibble, getLowerNibble, nibblesToHex } from './utils';

export type InstructionArray = [number, number, number, number];
export type MatchInstructionCallback = (
  instruction: InstructionArray,
) => boolean;
export type OperationCallback = (
  instruction: InstructionArray,
) => Promise<void> | void;

export type InstructionCondition = [
  MatchInstructionCallback,
  OperationCallback,
];

export type InputCallback = () => Set<number>;
export type WaitInputCallback = () => Promise<number>;
export type CancelWaitInputCallback = () => void;

export interface Input {
  getInput: InputCallback;
  waitInput: WaitInputCallback;
  cancelWait: CancelWaitInputCallback;
}

export interface Storage {
  save: (data: any) => Promise<void> | void;
  load: () => Promise<any> | any;
}

export interface VmParams {
  program: Uint8Array;
  input: Input;
  logger?: Console;
  storage?: Storage;
}

export class GameboyEmulator {
  memory = new Uint8Array(MEMORY_SIZE);
  display = new Display(DISPLAY_WIDTH, DISPLAY_HEIGHT);
  registers = new Uint8Array(REGISTER_COUNT);
  pc = PROGRAM_START;
  sp = -1;
  stack: number[] = [];
  isHalted = false;
  input: Input;
  logger?: Console;
  storage?: Storage;

  operations: InstructionCondition[];

  constructor({ program, input, logger, storage }: VmParams) {
    for (let i = 0; i < program.length; i++) {
      this.memory[PROGRAM_START + i] = program[i];
    }

    this.input = input;
    this.logger = logger;
    this.storage = storage;
  }

  async executeInstruction() {
    const instruction = this.fetchInstruction();
    const [_, operation] =
      this.operations.find(([condition]) => condition(instruction)) ?? [];

    if (!operation) {
      this.logger?.warn('Unknown instruction: ', nibblesToHex(instruction));
      return;
    }

    await operation.bind(this)(instruction);
  }

  fetchInstruction(): InstructionArray {
    if (this.isHalted) {
      throw new Error('The program is halted.');
    }

    if (this.pc >= MEMORY_SIZE - 1) {
      throw new Error('Program counter has reached the end of the memory.');
    }
    const byte1 = this.memory[this.pc++];
    const byte2 = this.memory[this.pc++];
    return [
      getHigherNibble(byte1),
      getLowerNibble(byte1),
      getHigherNibble(byte2),
      getLowerNibble(byte2),
    ];
  }

  clear() {
    this.display = new Display(this.display.width, this.display.height);
  }
}
