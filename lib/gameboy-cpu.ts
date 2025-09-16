import { ClockData } from './clock-data.js';
import { Clock } from './clock.js';
import { DEBUG, Interrupt, INTERRUPT_ADDRESS_MAPPING, PREFIX_CB } from './constants.js';
import { Memory } from './memory.js';
import operationCodesMap from './operations/operation-codes.js';
import prefixCbOperations from './operations/prefixCb/operationCodes.js';
import { Register16, Register8, Registers } from './registers.js';
import { getEnumValues, toRawHex } from './utils.js';
import { OperationCode, OperationInfo } from './operations/operation.js';

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
  lastFetchedValue = 0;
  stateLogs: string[] = [];
  operationLogs: string[] = [];

  constructor({ memory, clock }: CpuParams) {
    this.memory = memory;
    this.clock = clock;
  }

  step() {
    const interruptClockData = this.#checkInterrupts();

    if (this.isHalted) {
      return interruptClockData;
    }

    this.hasBranched = false;

    const pc = this.registers.getWord(Register16.PC);
    if (pc === 0xc365) {
      const a = 0;
    }

    const { operationCode, operationInfo } = this.#getOperation();

    operationInfo.operation(this);
    const clockData = this.hasBranched
      ? operationInfo.clockWithBranching
      : operationInfo.clock;

    this.log(operationCode!.mnemonic);

    if (clockData === undefined) {
      throw new Error(
        `Opcode ${operationCode?.opcode} has branched but there is no clock data provided for the branching case`,
      );
    }

    return clockData.add(interruptClockData);
  }

  #getOperation() {
    const opcode = this.fetchByte();
    const operationCode = operationCodesMap.get(opcode);
    const operationInfo = operationCode?.operationInfo;
    if (operationCode === undefined || operationInfo === undefined) {
      throw new Error(`Unknown opcode ${opcode}`);
    }

    return opcode === PREFIX_CB
      ? this.#getPrefixCbOperation()
      : { operationCode, operationInfo };
  }

  #getPrefixCbOperation() {
    const opcode = this.fetchByte();
    const operationCode = prefixCbOperations.get(opcode);
    const operationInfo = operationCode?.operationInfo;
    if (operationCode === undefined || operationInfo === undefined) {
      throw new Error(`Unknown prefixCb opcode ${opcode}`);
    }

    return { operationCode, operationInfo };
  }

  fetchByte() {
    const pc = this.registers.getWord(Register16.PC);
    this.#checkBios(pc);
    this.registers.incrementWord(Register16.PC);
    const byte = this.memory.getByte(pc);
    this.lastFetchedValue = byte;
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
    this.lastFetchedValue = word;
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
    if (!this.isHalted && !this.ime) return ClockData.empty();

    const ies = this.memory.getIe();
    const ifs = this.memory.getIf();

    for (const interrupt of getEnumValues<Interrupt>(Interrupt)) {
      if (ies[interrupt] && ifs[interrupt]) {
        return this.#handleInterrupt(interrupt);
      }

      if (this.isHalted && ifs[interrupt]) {
        this.isHalted = false;
        return ClockData.empty();
      }
    }

    return ClockData.empty();
  }

  #handleInterrupt(interrupt: Interrupt) {
    this.pushSp(Register16.PC);

    const interruptAddress = INTERRUPT_ADDRESS_MAPPING[interrupt];
    this.registers.setWord(Register16.PC, interruptAddress);

    this.isHalted = false;
    this.ime = false;
    this.memory.setIf({ [interrupt]: false });

    return new ClockData(5);
  }

  log(mnemonic?: string) {
    this.#logState();
    if (mnemonic) {
      this.#logOperation(mnemonic);
    }
  }

  #logState() {
    if (!DEBUG) return;

    const a = this.registers.getByte(Register8.A);
    const f = this.registers.getByte(Register8.F);
    const b = this.registers.getByte(Register8.B);
    const c = this.registers.getByte(Register8.C);
    const d = this.registers.getByte(Register8.D);
    const e = this.registers.getByte(Register8.E);
    const h = this.registers.getByte(Register8.H);
    const l = this.registers.getByte(Register8.L);
    const sp = this.registers.getWord(Register16.SP);
    const pc = this.registers.getWord(Register16.PC);
    const pcmem = this.memory.getByte(pc);
    const pcmem1 = this.memory.getByte(pc + 1);
    const pcmem2 = this.memory.getByte(pc + 2);
    const pcmem3 = this.memory.getByte(pc + 3);

    const log = `A:${toRawHex(a)} F:${toRawHex(f)} B:${toRawHex(
      b,
    )} C:${toRawHex(c)} D:${toRawHex(d)} E:${toRawHex(e)} H:${toRawHex(
      h,
    )} L:${toRawHex(l)} SP:${toRawHex(sp, 4)} PC:${toRawHex(
      pc,
      4,
    )} PCMEM:${toRawHex(pcmem)},${toRawHex(pcmem1)},${toRawHex(
      pcmem2,
    )},${toRawHex(pcmem3)}`;

    if (log !== this.stateLogs[this.stateLogs.length - 1]) {
      this.stateLogs.push(`${log}\n`);
    }
  }

  #logOperation(mnemonic: string) {
    const textOperation = mnemonic.replace(
      '{}',
      this.lastFetchedValue.toString(),
    );
    this.operationLogs.push(`${textOperation}\n`);
  }
}
