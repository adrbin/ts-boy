import { ClockData } from './clock-data.js';
import { Clock } from './clock.js';
import { Interrupt, INTERRUPT_ADDRESS_MAPPING } from './constants.js';
import { Memory } from './memory.js';
import operationCodesMap from './operations/operation-codes.js';
import referenceOpcodes from './operations/reference-opcodes.js';
import { Register16, Registers } from './registers.js';
import { getEnumValues, toHex } from './utils.js';

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
  ime = false;

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

    const interruptClockData = this.#checkInterrupts();

    return clockData.add(interruptClockData);
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

  #checkBios(pc: number) {
    if (this.memory.isBiosLoaded && !this.memory.bios.hasRelativeAddress(pc)) {
      this.memory.unloadBios();
    }
  }

  #checkInterrupts() {
    if (!this.ime) return ClockData.empty();

    const ies = this.memory.getIe();
    const ifs = this.memory.getIf();

    for (const interrupt of getEnumValues<Interrupt>(Interrupt)) {
      if (ies[interrupt] && ifs[interrupt]) {
        return this.#handleInterrupt(interrupt);
      }
    }

    return ClockData.empty();
  }

  #handleInterrupt(interrupt: Interrupt) {
    this.pushSp(Register16.PC);

    const interruptAddress = INTERRUPT_ADDRESS_MAPPING[interrupt];
    this.registers.setWord(Register16.PC, interruptAddress);

    this.ime = false;
    this.memory.setIf({ [interrupt]: false });

    return new ClockData(5);
  }
}
