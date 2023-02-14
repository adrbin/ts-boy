import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';
import { Flag, Register8 } from '../registers';
import { getNthBit, hasByteSumHalfCarry, isSumZero, toByte } from '../utils';
import { Operation, OperationInfo } from './operation';

const rotateLeftA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const bit7 = getNthBit(a, 7);

    const resultByte = toByte((a << 1) | bit7);

    cpu.registers.setByte(Register8.A, resultByte);

    const flags = {
      [Flag.Zero]: false,
      [Flag.Negative]: false,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: bit7 === 1,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const rotateRightA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const bit0 = getNthBit(a, 0);

    const resultByte = toByte((a >>> 1) | (bit0 << 7));

    cpu.registers.setByte(Register8.A, resultByte);

    const flags = {
      [Flag.Zero]: false,
      [Flag.Negative]: false,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: bit0 === 1,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const rotateLeftThroughCarryA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const oldFlags = cpu.registers.getFlags();
    const carry = oldFlags[Flag.Carry] ? 1 : 0;
    const bit7 = getNthBit(a, 7);

    const resultByte = toByte((a << 1) | carry);

    cpu.registers.setByte(Register8.A, resultByte);

    const flags = {
      [Flag.Zero]: false,
      [Flag.Negative]: false,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: bit7 === 1,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const rotateRightThroughCarryA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const oldFlags = cpu.registers.getFlags();
    const carry = oldFlags[Flag.Carry] ? 1 : 0;
    const bit0 = getNthBit(a, 0);

    const resultByte = toByte((a >>> 1) | (carry << 7));

    cpu.registers.setByte(Register8.A, resultByte);

    const flags = {
      [Flag.Zero]: false,
      [Flag.Negative]: false,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: bit0 === 1,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const operations: Operation[] = [
  {
    opcode: 0x07,
    operationInfo: rotateLeftA,
  },
  {
    opcode: 0x0e,
    operationInfo: rotateRightA,
  },
  {
    opcode: 0x17,
    operationInfo: rotateLeftThroughCarryA,
  },
  {
    opcode: 0x1e,
    operationInfo: rotateRightThroughCarryA,
  },
];

export default operations;
