import { ClockData } from '../../clock-data.js';
import { GameboyCpu } from '../../gameboy-cpu.js';
import { Flag, Register8 } from '../../registers.js';
import { getNthBit, toByte } from '../../utils.js';
import { OperationInfo } from '../operation.js';

export enum RotateMode {
  Normal,
  ThroughCarry,
}

export const rotateLeftA = (mode: RotateMode): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const oldFlags = cpu.registers.getFlags();
      const carry = oldFlags[Flag.Carry] ? 1 : 0;
      const bit7 = getNthBit(a, 7);
      const newBit0 = mode === RotateMode.ThroughCarry ? carry : bit7;

      const resultByte = toByte((a << 1) | newBit0);

      cpu.registers.setByte(Register8.A, resultByte);

      setRotateFlags(cpu, bit7);
    },
    length: 1,
    clock: new ClockData(1),
  };
};

export const rotateRightA = (mode: RotateMode): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const oldFlags = cpu.registers.getFlags();
      const carry = oldFlags[Flag.Carry] ? 1 : 0;
      const bit0 = getNthBit(a, 0);
      const newBit7 = mode === RotateMode.ThroughCarry ? carry << 7 : bit0 << 7;

      const resultByte = toByte((a >>> 1) | newBit7);

      cpu.registers.setByte(Register8.A, resultByte);

      setRotateFlags(cpu, bit0);
    },
    length: 1,
    clock: new ClockData(1),
  };
};

const setRotateFlags = (cpu: GameboyCpu, carryBit: number) => {
  const flags = {
    [Flag.Zero]: false,
    [Flag.Negative]: false,
    [Flag.HalfCarry]: false,
    [Flag.Carry]: carryBit === 1,
  };

  cpu.registers.setFlags(flags);
};
