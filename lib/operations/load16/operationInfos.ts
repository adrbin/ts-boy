import { ClockData } from '../../clock-data.js';
import { GameboyCpu } from '../../gameboy-cpu.js';
import { Register16, Register8 } from '../../registers.js';
import { OperationInfo } from '../operation.js';

export const loadRegister16FromWord = (
  register16: Register16,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const word = cpu.fetchWord();
      cpu.registers.setWord(register16, word);
    },
    length: 3,
    clock: new ClockData(3),
  };
};

export const loadRegister16AddressFromA = (
  register16: Register16,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(register16);
      const a = cpu.registers.getByte(Register8.A);
      cpu.memory.setByte(address, a);
    },
    length: 1,
    clock: new ClockData(2),
  };
};

export const loadAddressFromSp: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.fetchWord();
    const sp = cpu.registers.getWord(Register16.SP);
    cpu.memory.setWord(address, sp);
  },
  length: 3,
  clock: new ClockData(5),
};

export const popToRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.popSp(register16);
    },
    length: 1,
    clock: new ClockData(3),
  };
};

export const pushFromRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.pushSp(register16);
    },
    length: 1,
    clock: new ClockData(3),
  };
};

export const loadSpFromHl = {
  operation: (cpu: GameboyCpu) => {
    cpu.registers.setRegister16(Register16.HL, Register16.SP);
  },
  length: 1,
  clock: new ClockData(2),
};
