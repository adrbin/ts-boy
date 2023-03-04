import { Clock } from './clock';
import { Memory } from './memory';
import operationCodesMap from './operations/operation-codes';
import { Register16, Registers } from './registers';

export class GameboyCpu {
  registers = new Registers();
  memory: Memory;
  clock = new Clock();
  isStopped = false;
  isHalted = false;
  hasBranched = false;

  constructor(bios: Uint8Array, rom: Uint8Array | undefined = undefined) {
    this.memory = new Memory(bios, rom);
  }

  execute() {
    const opcode = this.fetchByte();
    const operationInfo = operationCodesMap.get(opcode)?.operationInfo;
    if (operationInfo === undefined) {
      throw new Error(`Unknown opcode ${opcode}`);
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

    this.clock.increment(clockData);

    this.hasBranched = false;
  }

  fetchByte() {
    const pc = this.registers.getWord(Register16.PC);
    this.#checkBios(pc);
    this.registers.incrementWord(Register16.PC);
    const byte = this.memory.getByte(pc);
    return byte;
  }

  fetchWord() {
    const pc = this.registers.getWord(Register16.PC);
    this.#checkBios(pc);
    this.registers.incrementWord(Register16.PC, 2);
    const word = this.memory.getWord(pc);
    return word;
  }

  #checkBios(pc: number) {
    if (this.memory.isBiosLoaded && !this.memory.bios.hasRelativeAddress(pc)) {
      this.memory.isBiosLoaded = false;
    }
  }

  popSp(register16: Register16) {
    const address = this.registers.getWord(Register16.SP);
    this.registers.incrementWord(Register16.SP, 2);
    const word = this.memory.getWord(address);
    this.registers.setWord(register16, word);
  }

  pushSp(register16: Register16) {
    const word = this.registers.getWord(register16);
    this.registers.decrementWord(Register16.SP, 2);
    const address = this.registers.getWord(Register16.SP);
    this.memory.setWord(address, word);
  }
}
