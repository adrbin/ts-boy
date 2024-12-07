import { ClockData } from '../../clock-data.js';
import { GameboyCpu } from '../../gameboy-cpu.js';
import { Flag, Register16 } from '../../registers.js';
import {
  hasByteSumCarry,
  hasByteSumHalfCarry,
  hasWordSumCarry,
  hasWordSumHalfCarry,
  toSignedByte,
  toWord,
} from '../../utils.js';
import { OperationInfo } from '../operation.js';

export const incrementRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.registers.incrementWord(register16);
    },
    length: 1,
    clock: new ClockData(2),
  };
};

export const decrementRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.registers.decrementWord(register16);
    },
    length: 1,
    clock: new ClockData(2),
  };
};

export const addRegister16ToHl = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const hl = cpu.registers.getWord(Register16.HL);
      const word = cpu.registers.getWord(register16);

      cpu.registers.incrementWord(Register16.HL, word);

      const flags = {
        [Flag.Negative]: false,
        [Flag.HalfCarry]: hasWordSumHalfCarry(hl, word),
        [Flag.Carry]: hasWordSumCarry(hl, word),
      };

      cpu.registers.setFlags(flags);
    },
    length: 1,
    clock: new ClockData(2),
  };
};

export const addByteToSp: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const sp = cpu.registers.getWord(Register16.SP);
    const unsignedByte = cpu.fetchByte();
    const signedByte = toSignedByte(unsignedByte);

    cpu.registers.incrementWord(Register16.SP, signedByte);

    setSpFlags(cpu, sp, signedByte);
  },
  length: 2,
  clock: new ClockData(4),
};

export const loadHlFromSpWithByte: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const sp = cpu.registers.getWord(Register16.SP);
    const unsignedByte = cpu.fetchByte();
    const signedByte = toSignedByte(unsignedByte);
    const sum = toWord(sp + signedByte);

    cpu.registers.setWord(Register16.HL, sum);

    setSpFlags(cpu, sp, signedByte);
  },
  length: 2,
  clock: new ClockData(3),
};

const setSpFlags = (cpu: GameboyCpu, sp: number, signedByte: number) => {
  const flags = {
    [Flag.Zero]: false,
    [Flag.Negative]: false,
    [Flag.HalfCarry]: hasByteSumHalfCarry(sp, signedByte),
    [Flag.Carry]: hasByteSumCarry(sp, signedByte),
  };

  cpu.registers.setFlags(flags);
};
