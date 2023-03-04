import { Clock } from '../../clock';
import { GameboyCpu } from '../../gameboy-cpu';
import { Flag, Register16, Register8 } from '../../registers';
import {
  hasByteSumCarry,
  hasByteSumHalfCarry,
  isSumZero,
  toByte,
  toNibble,
} from '../../utils';
import { OperationCode, OperationInfo } from '../operation';

export const incrementRegister8 = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);

      cpu.registers.incrementByte(register8);

      setIncrementFlags(cpu, byte);
    },
    length: 1,
    clock: new Clock(1),
  };
};

export const decrementRegister8 = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);

      cpu.registers.decrementByte(register8);

      setDecrementFlags(cpu, byte);
    },
    length: 1,
    clock: new Clock(1),
  };
};

export const incrementHlAddress: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);

    cpu.memory.setByte(address, toByte(byte + 1));

    setIncrementFlags(cpu, byte);
  },
  length: 1,
  clock: new Clock(1),
};

export const decrementHlAddress: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);

    cpu.memory.setByte(address, toByte(byte - 1));

    setDecrementFlags(cpu, byte);
  },
  length: 1,
  clock: new Clock(1),
};

const setIncrementFlags = (cpu: GameboyCpu, byte: number) => {
  const flags = {
    [Flag.Zero]: isSumZero(byte, 1),
    [Flag.Negative]: false,
    [Flag.HalfCarry]: hasByteSumHalfCarry(byte, 1),
  };

  cpu.registers.setFlags(flags);
};

const setDecrementFlags = (cpu: GameboyCpu, byte: number) => {
  const flags = {
    [Flag.Zero]: isSumZero(byte, -1),
    [Flag.Negative]: true,
    [Flag.HalfCarry]: hasByteSumHalfCarry(byte, -1),
  };

  cpu.registers.setFlags(flags);
};

export const decimalAdjustA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const oldFlags = cpu.registers.getFlags();

    let adjustment = 0;

    if (oldFlags[Flag.HalfCarry] || toNibble(a) > 9) {
      adjustment = 6;
    }

    if (oldFlags[Flag.Carry] || a > 0x99) {
      adjustment += 0x6;
    }

    if (oldFlags[Flag.Negative]) {
      adjustment = -adjustment;
    }

    const resultByte = toByte(a + adjustment);

    cpu.registers.setByte(Register8.A, resultByte);

    const flags = {
      [Flag.Zero]: resultByte === 0,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: resultByte > 0x99,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

export const complementA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const byte = cpu.registers.getByte(Register8.A);

    cpu.registers.setByte(Register8.A, byte ^ 0xff);

    const flags = {
      [Flag.Negative]: true,
      [Flag.HalfCarry]: true,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const setCarryFlag: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const flags = {
      [Flag.Negative]: false,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: true,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

export const complementCarryFlag: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const oldFlags = cpu.registers.getFlags();

    const flags = {
      [Flag.Negative]: false,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: !oldFlags[Flag.Carry],
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

export const addRegister8ToA = (
  register8: Register8,
  withCarry = false,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.registers.getByte(register8);
      const oldFlags = cpu.registers.getFlags();
      const carry = withCarry && oldFlags[Flag.Carry] ? 1 : 0;

      cpu.registers.incrementByte(Register8.A, byte + carry);

      setAddSubtractFlags(cpu, a, byte, carry, false);
    },
    length: 1,
    clock: new Clock(1),
  };
};

export const addHlAddressToA = (withCarry = false): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      const oldFlags = cpu.registers.getFlags();
      const carry = withCarry && oldFlags[Flag.Carry] ? 1 : 0;

      cpu.registers.incrementByte(Register8.A, byte + carry);

      setAddSubtractFlags(cpu, a, byte, carry, false);
    },
    length: 1,
    clock: new Clock(2),
  };
};

export const subtractRegister8FromA = (
  register8: Register8,
  withCarry = false,
  withSave = true,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.registers.getByte(register8);
      const oldFlags = cpu.registers.getFlags();
      const carry = withCarry && oldFlags[Flag.Carry] ? 1 : 0;

      if (withSave) {
        cpu.registers.decrementByte(Register8.A, byte + carry);
      }

      setAddSubtractFlags(cpu, a, -byte, -carry, true);
    },
    length: 1,
    clock: new Clock(1),
  };
};

export const subtractHlAddressFromA = (
  withCarry = false,
  withSave = true,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      const oldFlags = cpu.registers.getFlags();
      const carry = withCarry && oldFlags[Flag.Carry] ? 1 : 0;

      if (withSave) {
        cpu.registers.decrementByte(Register8.A, byte + carry);
      }

      setAddSubtractFlags(cpu, a, -byte, -carry, true);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const setAddSubtractFlags = (
  cpu: GameboyCpu,
  a: number,
  byte: number,
  carry: number,
  negativeFlag: boolean,
) => {
  const flags = {
    [Flag.Zero]: isSumZero(a, byte, carry),
    [Flag.Negative]: negativeFlag,
    [Flag.HalfCarry]: hasByteSumHalfCarry(a, byte, carry),
    [Flag.Carry]: hasByteSumCarry(a, byte, carry),
  };

  cpu.registers.setFlags(flags);
};

export enum LogicalOperation {
  And,
  Xor,
  Or,
}

const logicalOperations: Record<
  LogicalOperation,
  (a: number, b: number) => number
> = {
  [LogicalOperation.And]: (a: number, b: number) => a & b,
  [LogicalOperation.Xor]: (a: number, b: number) => a ^ b,
  [LogicalOperation.Or]: (a: number, b: number) => a | b,
};

export const logicallyApplyRegister8ToA = (
  register8: Register8,
  logicalOperation: LogicalOperation,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.registers.getByte(register8);

      const resultByte = logicalOperations[logicalOperation](a, byte);

      cpu.registers.setByte(Register8.A, resultByte);

      setLogicalOperationsFlags(cpu, resultByte);
    },
    length: 1,
    clock: new Clock(1),
  };
};

export const logicallyApplyHlAddressWithA = (
  logicalOperation: LogicalOperation,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);

      const resultByte = logicalOperations[logicalOperation](a, byte);

      cpu.registers.setByte(Register8.A, resultByte);

      setLogicalOperationsFlags(cpu, resultByte);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const setLogicalOperationsFlags = (cpu: GameboyCpu, resultByte: number) => {
  const flags = {
    [Flag.Zero]: resultByte === 0,
    [Flag.Negative]: false,
    [Flag.HalfCarry]: true,
    [Flag.Carry]: false,
  };

  cpu.registers.setFlags(flags);
};

export const addByteToA = (withCarry = false): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.fetchByte();
      const oldFlags = cpu.registers.getFlags();
      const carry = withCarry && oldFlags[Flag.Carry] ? 1 : 0;

      cpu.registers.incrementByte(Register8.A, byte + carry);

      setAddSubtractAFlags(cpu, a, byte, carry, false);
    },
    length: 2,
    clock: new Clock(2),
  };
};

export const subtractByteFromA = (
  withCarry = false,
  withSave = true,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.fetchByte();
      const oldFlags = cpu.registers.getFlags();
      const carry = withCarry && oldFlags[Flag.Carry] ? 1 : 0;

      if (withSave) {
        cpu.registers.decrementByte(Register8.A, byte + carry);
      }

      setAddSubtractAFlags(cpu, a, -byte, -carry, true);
    },
    length: 2,
    clock: new Clock(2),
  };
};

const setAddSubtractAFlags = (
  cpu: GameboyCpu,
  a: number,
  byte: number,
  carry: number,
  negativeFlag: boolean,
) => {
  const flags = {
    [Flag.Zero]: isSumZero(a, byte, carry),
    [Flag.Negative]: negativeFlag,
    [Flag.HalfCarry]: hasByteSumHalfCarry(a, byte, carry),
    [Flag.Carry]: hasByteSumCarry(a, byte, carry),
  };

  cpu.registers.setFlags(flags);
};

export const logicallyApplyByteToA = (
  logicalOperation: LogicalOperation,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.fetchByte();

      const resultByte = logicalOperations[logicalOperation](a, byte);

      cpu.registers.setByte(Register8.A, resultByte);

      const newFlags = {
        [Flag.Zero]: resultByte === 0,
        [Flag.Negative]: false,
        [Flag.HalfCarry]: true,
        [Flag.Carry]: false,
      };

      cpu.registers.setFlags(newFlags);
    },
    length: 1,
    clock: new Clock(1),
  };
};

const operations: OperationCode[] = [
  {
    opcode: 0x04,
    operationInfo: incrementRegister8(Register8.B),
  },
  {
    opcode: 0x14,
    operationInfo: incrementRegister8(Register8.D),
  },
  {
    opcode: 0x24,
    operationInfo: incrementRegister8(Register8.H),
  },
  {
    opcode: 0x34,
    operationInfo: incrementHlAddress,
  },
  {
    opcode: 0x0c,
    operationInfo: incrementRegister8(Register8.C),
  },
  {
    opcode: 0x1c,
    operationInfo: incrementRegister8(Register8.E),
  },
  {
    opcode: 0x2c,
    operationInfo: incrementRegister8(Register8.L),
  },
  {
    opcode: 0x3c,
    operationInfo: incrementRegister8(Register8.A),
  },
  {
    opcode: 0x05,
    operationInfo: decrementRegister8(Register8.B),
  },
  {
    opcode: 0x15,
    operationInfo: decrementRegister8(Register8.D),
  },
  {
    opcode: 0x25,
    operationInfo: decrementRegister8(Register8.H),
  },
  {
    opcode: 0x35,
    operationInfo: decrementHlAddress,
  },
  {
    opcode: 0x0d,
    operationInfo: decrementRegister8(Register8.C),
  },
  {
    opcode: 0x1d,
    operationInfo: decrementRegister8(Register8.E),
  },
  {
    opcode: 0x2d,
    operationInfo: decrementRegister8(Register8.L),
  },
  {
    opcode: 0x3d,
    operationInfo: decrementRegister8(Register8.A),
  },
  {
    opcode: 0x27,
    operationInfo: decimalAdjustA,
  },
  {
    opcode: 0x2f,
    operationInfo: complementA,
  },
  {
    opcode: 0x37,
    operationInfo: setCarryFlag,
  },
  {
    opcode: 0x3f,
    operationInfo: complementCarryFlag,
  },
  {
    opcode: 0x80,
    operationInfo: addRegister8ToA(Register8.B),
  },
  {
    opcode: 0x81,
    operationInfo: addRegister8ToA(Register8.C),
  },
  {
    opcode: 0x82,
    operationInfo: addRegister8ToA(Register8.D),
  },
  {
    opcode: 0x83,
    operationInfo: addRegister8ToA(Register8.E),
  },
  {
    opcode: 0x84,
    operationInfo: addRegister8ToA(Register8.L),
  },
  {
    opcode: 0x85,
    operationInfo: addRegister8ToA(Register8.B),
  },
  {
    opcode: 0x86,
    operationInfo: addHlAddressToA(),
  },
  {
    opcode: 0x87,
    operationInfo: addRegister8ToA(Register8.A),
  },
  {
    opcode: 0x88,
    operationInfo: addRegister8ToA(Register8.B, true),
  },
  {
    opcode: 0x89,
    operationInfo: addRegister8ToA(Register8.C, true),
  },
  {
    opcode: 0x8a,
    operationInfo: addRegister8ToA(Register8.D, true),
  },
  {
    opcode: 0x8b,
    operationInfo: addRegister8ToA(Register8.E, true),
  },
  {
    opcode: 0x8c,
    operationInfo: addRegister8ToA(Register8.L, true),
  },
  {
    opcode: 0x8d,
    operationInfo: addRegister8ToA(Register8.B, true),
  },
  {
    opcode: 0x8e,
    operationInfo: addHlAddressToA(true),
  },
  {
    opcode: 0x8f,
    operationInfo: addRegister8ToA(Register8.A, true),
  },
  {
    opcode: 0x90,
    operationInfo: subtractRegister8FromA(Register8.B),
  },
  {
    opcode: 0x91,
    operationInfo: subtractRegister8FromA(Register8.C),
  },
  {
    opcode: 0x92,
    operationInfo: subtractRegister8FromA(Register8.D),
  },
  {
    opcode: 0x93,
    operationInfo: subtractRegister8FromA(Register8.E),
  },
  {
    opcode: 0x94,
    operationInfo: subtractRegister8FromA(Register8.L),
  },
  {
    opcode: 0x95,
    operationInfo: subtractRegister8FromA(Register8.B),
  },
  {
    opcode: 0x96,
    operationInfo: subtractHlAddressFromA(),
  },
  {
    opcode: 0x97,
    operationInfo: subtractRegister8FromA(Register8.A),
  },
  {
    opcode: 0x98,
    operationInfo: subtractRegister8FromA(Register8.B, true),
  },
  {
    opcode: 0x99,
    operationInfo: subtractRegister8FromA(Register8.C, true),
  },
  {
    opcode: 0x9a,
    operationInfo: subtractRegister8FromA(Register8.D, true),
  },
  {
    opcode: 0x9b,
    operationInfo: subtractRegister8FromA(Register8.E, true),
  },
  {
    opcode: 0x9c,
    operationInfo: subtractRegister8FromA(Register8.L, true),
  },
  {
    opcode: 0x9d,
    operationInfo: subtractRegister8FromA(Register8.B, true),
  },
  {
    opcode: 0x9e,
    operationInfo: subtractHlAddressFromA(true),
  },
  {
    opcode: 0x9f,
    operationInfo: subtractRegister8FromA(Register8.A, true),
  },
  {
    opcode: 0xa0,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa1,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.C,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa2,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.D,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa3,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.E,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa4,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.L,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa5,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa6,
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.And),
  },
  {
    opcode: 0xa7,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.A,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa8,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xa9,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.C,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xaa,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.D,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xab,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.E,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xac,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.L,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xad,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xae,
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.Xor),
  },
  {
    opcode: 0xaf,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.A,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xb0,
    operationInfo: logicallyApplyRegister8ToA(Register8.B, LogicalOperation.Or),
  },
  {
    opcode: 0xb1,
    operationInfo: logicallyApplyRegister8ToA(Register8.C, LogicalOperation.Or),
  },
  {
    opcode: 0xb2,
    operationInfo: logicallyApplyRegister8ToA(Register8.D, LogicalOperation.Or),
  },
  {
    opcode: 0xb3,
    operationInfo: logicallyApplyRegister8ToA(Register8.E, LogicalOperation.Or),
  },
  {
    opcode: 0xb4,
    operationInfo: logicallyApplyRegister8ToA(Register8.L, LogicalOperation.Or),
  },
  {
    opcode: 0xb5,
    operationInfo: logicallyApplyRegister8ToA(Register8.B, LogicalOperation.Or),
  },
  {
    opcode: 0xb6,
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.Or),
  },
  {
    opcode: 0xb7,
    operationInfo: logicallyApplyRegister8ToA(Register8.A, LogicalOperation.Or),
  },
  {
    opcode: 0xb8,
    operationInfo: subtractRegister8FromA(Register8.B, false, false),
  },
  {
    opcode: 0xb9,
    operationInfo: subtractRegister8FromA(Register8.C, false, false),
  },
  {
    opcode: 0xba,
    operationInfo: subtractRegister8FromA(Register8.D, false, false),
  },
  {
    opcode: 0xbb,
    operationInfo: subtractRegister8FromA(Register8.E, false, false),
  },
  {
    opcode: 0xbc,
    operationInfo: subtractRegister8FromA(Register8.L, false, false),
  },
  {
    opcode: 0xbd,
    operationInfo: subtractRegister8FromA(Register8.B, false, false),
  },
  {
    opcode: 0xbe,
    operationInfo: subtractHlAddressFromA(false, false),
  },
  {
    opcode: 0xbf,
    operationInfo: subtractRegister8FromA(Register8.A, false, false),
  },
  {
    opcode: 0xc6,
    operationInfo: addByteToA(),
  },
  {
    opcode: 0xce,
    operationInfo: addByteToA(true),
  },
  {
    opcode: 0xd6,
    operationInfo: subtractByteFromA(),
  },
  {
    opcode: 0xde,
    operationInfo: subtractByteFromA(true),
  },
  {
    opcode: 0xe6,
    operationInfo: logicallyApplyByteToA(LogicalOperation.And),
  },
  {
    opcode: 0xee,
    operationInfo: logicallyApplyByteToA(LogicalOperation.Xor),
  },
  {
    opcode: 0xf6,
    operationInfo: logicallyApplyByteToA(LogicalOperation.Or),
  },
  {
    opcode: 0xfe,
    operationInfo: subtractByteFromA(false, false),
  },
];

export default operations;
