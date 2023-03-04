import { ClockData } from '../../clock-data';
import { GameboyCpu } from '../../gameboy-cpu';
import { Register16, Register8 } from '../../registers';
import { OperationInfo } from '../operation';

export const loadHlAddressWithIncrementFromA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const hl = cpu.registers.getWord(Register16.HL);
    cpu.registers.incrementWord(Register16.HL);
    const a = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(hl, a);
  },
  length: 1,
  clock: new ClockData(2),
};

export const loadHlAddressWithDecrementFromA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const hlAddress = cpu.registers.getWord(Register16.HL);
    cpu.registers.decrementWord(Register16.HL, -1);
    const a = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(hlAddress, a);
  },
  length: 1,
  clock: new ClockData(2),
};

export const loadRegister8FromByte = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.fetchByte();
      cpu.registers.setByte(register8, byte);
    },
    length: 2,
    clock: new ClockData(2),
  };
};

export const loadHlAddressFromByte: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const byte = cpu.fetchByte();
    const hlAddress = cpu.registers.getWord(Register16.HL);
    cpu.memory.setByte(hlAddress, byte);
  },
  length: 2,
  clock: new ClockData(2),
};

export const loadAFromRegisterAddress = (
  register16: Register16,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(register16);
      const byte = cpu.memory.getByte(address);
      cpu.registers.setByte(Register8.A, byte);
    },
    length: 1,
    clock: new ClockData(2),
  };
};

export const loadAFromHlAddressWithIncrement: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const hl = cpu.registers.getWord(Register16.HL);
    cpu.registers.incrementWord(Register16.HL);
    cpu.memory.setByte(a, hl);
  },
  length: 1,
  clock: new ClockData(2),
};

export const loadAFromHlAddressWithDecrement: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const hl = cpu.registers.getWord(Register16.HL);
    cpu.registers.decrementWord(Register16.HL);
    cpu.memory.setByte(a, hl);
  },
  length: 1,
  clock: new ClockData(2),
};

export const loadRegister8FromRegister8 = (
  targetRegister8: Register8,
  sourceRegister8: Register8,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.registers.setRegister8(targetRegister8, sourceRegister8);
    },
    length: 1,
    clock: new ClockData(1),
  };
};

export const loadRegister8FromHlAddress = (
  register8: Register8,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      cpu.registers.setByte(register8, byte);
    },
    length: 1,
    clock: new ClockData(2),
  };
};

export const loadHlAddressFromRegister8 = (
  register8: Register8,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.registers.getByte(register8);
      cpu.memory.setByte(address, byte);
    },
    length: 1,
    clock: new ClockData(2),
  };
};

export const loadIoAddressWithByteOffsetFromRegisterA = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.fetchByte();
    const address = 0xff00 + offset;
    const byte = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(address, byte);
  },
  length: 2,
  clock: new ClockData(3),
};

export const loadRegisterAFromIoAddressWithByteOffset = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.fetchByte();
    const address = 0xff00 + offset;
    const byte = cpu.memory.getByte(address);
    cpu.registers.setByte(Register8.A, byte);
  },
  length: 2,
  clock: new ClockData(3),
};

export const loadIoAddressWithCOffsetFromA = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.registers.getByte(Register8.C);
    const address = 0xff00 + offset;
    const byte = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(address, byte);
  },
  length: 1,
  clock: new ClockData(2),
};

export const loadAFromIoAddressWithCOffset = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.registers.getByte(Register8.C);
    const address = 0xff00 + offset;
    const byte = cpu.memory.getByte(address);
    cpu.registers.setByte(Register8.A, byte);
  },
  length: 1,
  clock: new ClockData(2),
};

export const loadAddressFromA = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.fetchWord();
    const byte = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(address, byte);
  },
  length: 3,
  clock: new ClockData(4),
};

export const loadAFromAddress = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.fetchWord();
    const byte = cpu.memory.getByte(address);
    cpu.registers.setByte(Register8.A, byte);
  },
  length: 3,
  clock: new ClockData(4),
};
