import { ClockData } from '../../clock-data.js';
import { GameboyCpu } from '../../gameboy-cpu.js';
import { Flag, Register16, Register8 } from '../../registers.js';
import {
  getHigherNibble,
  getLowerNibble,
  getNthBit,
  joinNibbles,
  setNthBit,
  toByte,
} from '../../utils.js';
import { OperationInfo } from '../operation.js';

export enum ShiftMode {
  Logical,
  Arithmetic,
  Rotate,
  RotateThroughCarry,
}

export const shiftLeftRegister8 = (
  register8: Register8,
  mode: ShiftMode,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);
      const oldFlags = cpu.registers.getFlags();
      const carry = oldFlags[Flag.Carry] ? 1 : 0;
      const bit7 = getNthBit(byte, 7);
      const newBit0 = getNewBit0(mode, bit7, carry);

      const resultByte = toByte((byte << 1) | newBit0);

      cpu.registers.setByte(register8, resultByte);

      setShiftFlags(cpu, resultByte, bit7);
    },
    length: 2,
    clock: new ClockData(2),
  };
};

export const shiftLeftHlAddress = (mode: ShiftMode): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      const oldFlags = cpu.registers.getFlags();
      const carry = oldFlags[Flag.Carry] ? 1 : 0;
      const bit7 = getNthBit(byte, 7);
      const newBit0 = getNewBit0(mode, bit7, carry);

      const resultByte = toByte((byte << 1) | newBit0);

      cpu.memory.setByte(address, resultByte);

      setShiftFlags(cpu, resultByte, bit7);
    },
    length: 2,
    clock: new ClockData(4),
  };
};

const getNewBit0 = (mode: ShiftMode, bit7: number, carry: number) => {
  switch (mode) {
    case ShiftMode.Rotate:
      return bit7;
    case ShiftMode.RotateThroughCarry:
      return carry;
    default:
      return 0;
  }
};

export const shiftRightRegister8 = (
  register8: Register8,
  mode: ShiftMode,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);
      const oldFlags = cpu.registers.getFlags();
      const carry = oldFlags[Flag.Carry] ? 1 : 0;
      const bit0 = getNthBit(byte, 0);
      const bit7 = getNthBit(byte, 7);
      const newBit7 = getNewBit7(mode, bit0, bit7, carry);

      let resultByte = toByte((byte >>> 1) | newBit7);

      cpu.registers.setByte(register8, resultByte);

      setShiftFlags(cpu, resultByte, bit0);
    },
    length: 2,
    clock: new ClockData(2),
  };
};

export const shiftRightHlAddress = (mode: ShiftMode): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      const oldFlags = cpu.registers.getFlags();
      const carry = oldFlags[Flag.Carry] ? 1 : 0;
      const bit0 = getNthBit(byte, 0);
      const bit7 = getNthBit(byte, 7);
      const newBit7 = getNewBit7(mode, bit0, bit7, carry);

      let resultByte = toByte((byte >>> 1) | newBit7);

      cpu.memory.setByte(address, resultByte);

      setShiftFlags(cpu, resultByte, bit0);
    },
    length: 2,
    clock: new ClockData(4),
  };
};

const getNewBit7 = (mode: ShiftMode, bit0: number, bit7: number, carry: number) => {
  switch (mode) {
    case ShiftMode.Arithmetic:
      return bit7 << 7;
    case ShiftMode.Rotate:
      return bit0 << 7;
    case ShiftMode.RotateThroughCarry:
      return carry << 7;
    default:
      return 0;
  }
};

const setShiftFlags = (
  cpu: GameboyCpu,
  resultByte: number,
  carryBit: number,
) => {
  const flags = {
    [Flag.Zero]: resultByte === 0,
    [Flag.Negative]: false,
    [Flag.HalfCarry]: false,
    [Flag.Carry]: carryBit === 1,
  };

  cpu.registers.setFlags(flags);
};

export const swapRegister8 = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);

      const resultByte = joinNibbles(
        getHigherNibble(byte),
        getLowerNibble(byte),
      );

      cpu.registers.setByte(register8, resultByte);

      setSwapFlags(cpu, resultByte);
    },
    length: 2,
    clock: new ClockData(2),
  };
};

export const swapHlAddress: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);

    const resultByte = joinNibbles(getHigherNibble(byte), getLowerNibble(byte));

    cpu.memory.setByte(address, resultByte);

    setSwapFlags(cpu, resultByte);
  },
  length: 2,
  clock: new ClockData(4),
};

const setSwapFlags = (cpu: GameboyCpu, resultByte: number) => {
  const flags = {
    [Flag.Zero]: resultByte === 0,
    [Flag.Negative]: false,
    [Flag.HalfCarry]: false,
    [Flag.Carry]: false,
  };

  cpu.registers.setFlags(flags);
};

export const testBitOfRegister8 = (
  register8: Register8,
  bitIndex: number,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);
      const bit = getNthBit(byte, bitIndex);

      const flags = {
        [Flag.Zero]: bit === 0,
        [Flag.Negative]: false,
        [Flag.HalfCarry]: true,
      };

      cpu.registers.setFlags(flags);
    },
    length: 2,
    clock: new ClockData(2),
  };
};

export const testBitOfHlAddress = (bitIndex: number): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      const bit = getNthBit(byte, bitIndex);

      const flags = {
        [Flag.Zero]: bit === 0,
        [Flag.Negative]: false,
        [Flag.HalfCarry]: true,
      };

      cpu.registers.setFlags(flags);
    },
    length: 2,
    clock: new ClockData(3),
  };
};

export const setBitOfRegister8 = (
  register8: Register8,
  bitIndex: number,
  value: boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);
      const resultByte = setNthBit(byte, bitIndex, value);

      cpu.registers.setByte(register8, resultByte);
    },
    length: 2,
    clock: new ClockData(2),
  };
};

export const setBitOfHlAddress = (
  bitIndex: number,
  value: boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);

      const resultByte = setNthBit(byte, bitIndex, value);

      cpu.memory.setByte(address, resultByte);
    },
    length: 2,
    clock: new ClockData(4),
  };
};
