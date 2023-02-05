import { Memory } from './memory';
import { Register16, Registers } from './registers';

export class GameboyCpu {
  registers = new Registers();
  memory = new Memory();
  isStopped = false;
  isHalted = false;
  didBranch = false;

  fetchByte() {
    const sp = this.registers.getWord(Register16.SP);
    const byte = this.memory.getByte(sp);
    this.registers.incrementWord(Register16.SP, 1);
    return byte;
  }

  fetchWord() {
    const sp = this.registers.getWord(Register16.SP);
    const word = this.memory.getWord(sp);
    this.registers.incrementWord(Register16.SP, 2);
    return word;
  }

  popSp(register16: Register16) {
    const address = this.registers.getWord(Register16.SP);
    this.registers.incrementWord(Register16.SP, 2);
    const word = this.memory.getWord(address);
    this.registers.setWord(register16, word);
  }

  pushSp(register16: Register16) {
    const word = this.registers.getWord(Register16.SP);
    this.registers.decrementWord(Register16.SP, 2);
    const address = this.registers.getWord(Register16.SP);
    this.memory.setWord(address, word);
  }
}
