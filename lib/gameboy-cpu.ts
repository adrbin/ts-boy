import { Clock } from './clock.js';
import { Memory } from './memory.js';
import operationCodesMap from './operations/operation-codes.js';
import referenceOpcodes from './operations/reference-opcodes.js';
import { Register16, Registers } from './registers.js';
import { toHex } from './utils.js';

export interface CpuParams {
  memory: Memory;
  clock: Clock;
}

export class GameboyCpu {
  registers = new Registers();
  memory: Memory;
  clock: Clock;
  isStopped = false;
  isHalted = false;
  hasBranched = false;

  constructor({ memory, clock }: CpuParams) {
    this.memory = memory;
    this.clock = clock;
  }

  step() {
    this.hasBranched = false;

    const opcode = this.fetchByte();
    const operationCode = operationCodesMap.get(opcode);
    const operationInfo = operationCode?.operationInfo;
    if (operationInfo === undefined) {
      throw new Error(`Unknown opcode ${opcode}`);
    }

    const referenceOpcode =
      opcode == 0xcb
        ? referenceOpcodes.cbprefixed[toHex(this.peekByte())]
        : referenceOpcodes.unprefixed[toHex(opcode)];

    const pc = this.registers.getWord(Register16.PC);
    if (pc >= 0xf4) {
      const a = 0;
    }

    operationInfo.operation(this);
    const clockData = this.hasBranched
      ? operationInfo.clockWithBranching
      : operationInfo.clock;

    if (clockData === undefined) {
      throw new Error(
        `Opcode ${opcode} has branched but there is no clock data provided for the branching case`,
      );
    }

    return clockData;
  }

  fetchByte() {
    const pc = this.registers.getWord(Register16.PC);
    this.#checkBios(pc);
    this.registers.incrementWord(Register16.PC);
    const byte = this.memory.getByte(pc);
    return byte;
  }

  peekByte() {
    const pc = this.registers.getWord(Register16.PC);
    const byte = this.memory.getByte(pc);
    return byte;
  }

  fetchWord() {
    const pc = this.registers.getWord(Register16.PC);
    this.registers.incrementWord(Register16.PC, 2);
    const word = this.memory.getWord(pc);
    return word;
  }

  #checkBios(pc: number) {
    if (this.memory.isBiosLoaded && !this.memory.bios.hasRelativeAddress(pc)) {
      this.memory.unloadBios();
    }
  }

  popSp(register16: Register16) {
    const address = this.registers.getWord(Register16.SP);
    const word = this.memory.getWord(address);
    this.registers.setWord(register16, word);
    this.registers.incrementWord(Register16.SP, 2);
  }

  pushSp(register16: Register16) {
    this.registers.decrementWord(Register16.SP, 2);
    const address = this.registers.getWord(Register16.SP);
    const word = this.registers.getWord(register16);
    this.memory.setWord(address, word);
  }
}
