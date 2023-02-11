import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';
import { Flag, Register16, Register8 } from '../registers';
import { hasByteSumCarry, hasByteSumHalfCarry, isSumZero } from '../utils';
import { Operation, OperationInfo } from './operation';

const incrementRegister8 = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);

      cpu.registers.incrementByte(register8);

      const flags = {
        [Flag.Zero]: isSumZero(byte, 1),
        [Flag.Negative]: false,
        [Flag.HalfCarry]: hasByteSumHalfCarry(byte, 1),
      };

      cpu.registers.setFlags(flags);
    },
    length: 1,
    clock: new Clock(1),
  };
};

const decrementRegister8 = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);

      cpu.registers.decrementByte(register8);

      const flags = {
        [Flag.Zero]: isSumZero(byte, -1),
        [Flag.Negative]: true,
        [Flag.HalfCarry]: hasByteSumHalfCarry(byte, -1),
      };

      cpu.registers.setFlags(flags);
    },
    length: 1,
    clock: new Clock(1),
  };
};

const incrementHlAddress: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);

    cpu.memory.setByte(address, byte + 1);

    const flags = {
      [Flag.Zero]: isSumZero(byte, 1),
      [Flag.Negative]: false,
      [Flag.HalfCarry]: hasByteSumHalfCarry(byte, 1),
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const decrementHlAddress: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);

    cpu.memory.setByte(address, byte - 1);

    const flags = {
      [Flag.Zero]: isSumZero(byte, -1),
      [Flag.Negative]: true,
      [Flag.HalfCarry]: hasByteSumHalfCarry(byte, -1),
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const addRegister8ToRegisterA = (
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

      const newFlags = {
        [Flag.Zero]: isSumZero(a, byte, carry),
        [Flag.Negative]: false,
        [Flag.HalfCarry]: hasByteSumHalfCarry(a, byte, carry),
        [Flag.Carry]: hasByteSumCarry(a, byte, carry),
      };

      cpu.registers.setFlags(newFlags);
    },
    length: 1,
    clock: new Clock(1),
  };
};

const addHlAddressToRegisterA = (withCarry = false): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      const oldFlags = cpu.registers.getFlags();
      const carry = withCarry && oldFlags[Flag.Carry] ? 1 : 0;

      cpu.registers.incrementByte(Register8.A, byte + carry);

      const newFlags = {
        [Flag.Zero]: isSumZero(a, byte, carry),
        [Flag.Negative]: false,
        [Flag.HalfCarry]: hasByteSumHalfCarry(a, byte, carry),
        [Flag.Carry]: hasByteSumCarry(a, byte, carry),
      };

      cpu.registers.setFlags(newFlags);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const subtractRegister8FromRegisterA = (
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

      const newFlags = {
        [Flag.Zero]: isSumZero(a, -byte, -carry),
        [Flag.Negative]: true,
        [Flag.HalfCarry]: hasByteSumHalfCarry(a, -byte, -carry),
        [Flag.Carry]: hasByteSumCarry(a, -byte, -carry),
      };

      cpu.registers.setFlags(newFlags);
    },
    length: 1,
    clock: new Clock(1),
  };
};

const subtractHlAddressFromRegisterA = (
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

      const newFlags = {
        [Flag.Zero]: isSumZero(a, -byte, -carry),
        [Flag.Negative]: true,
        [Flag.HalfCarry]: hasByteSumHalfCarry(a, -byte, -carry),
        [Flag.Carry]: hasByteSumCarry(a, -byte, -carry),
      };

      cpu.registers.setFlags(newFlags);
    },
    length: 1,
    clock: new Clock(2),
  };
};

enum LogicalOperation {
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

const logicallyApplyRegister8ToRegisterA = (
  register8: Register8,
  logicalOperation: LogicalOperation,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.registers.getByte(register8);

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

const logicalOperationHlAddressWithRegisterA = (
  logicalOperation: LogicalOperation,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);

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
    clock: new Clock(2),
  };
};

const operations: Operation[] = [
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
    opcode: 0x80,
    operationInfo: addRegister8ToRegisterA(Register8.B),
  },
  {
    opcode: 0x81,
    operationInfo: addRegister8ToRegisterA(Register8.C),
  },
  {
    opcode: 0x82,
    operationInfo: addRegister8ToRegisterA(Register8.D),
  },
  {
    opcode: 0x83,
    operationInfo: addRegister8ToRegisterA(Register8.E),
  },
  {
    opcode: 0x84,
    operationInfo: addRegister8ToRegisterA(Register8.L),
  },
  {
    opcode: 0x85,
    operationInfo: addRegister8ToRegisterA(Register8.B),
  },
  {
    opcode: 0x86,
    operationInfo: addHlAddressToRegisterA(),
  },
  {
    opcode: 0x87,
    operationInfo: addRegister8ToRegisterA(Register8.A),
  },
  {
    opcode: 0x88,
    operationInfo: addRegister8ToRegisterA(Register8.B, true),
  },
  {
    opcode: 0x89,
    operationInfo: addRegister8ToRegisterA(Register8.C, true),
  },
  {
    opcode: 0x8a,
    operationInfo: addRegister8ToRegisterA(Register8.D, true),
  },
  {
    opcode: 0x8b,
    operationInfo: addRegister8ToRegisterA(Register8.E, true),
  },
  {
    opcode: 0x8c,
    operationInfo: addRegister8ToRegisterA(Register8.L, true),
  },
  {
    opcode: 0x8d,
    operationInfo: addRegister8ToRegisterA(Register8.B, true),
  },
  {
    opcode: 0x8e,
    operationInfo: addHlAddressToRegisterA(true),
  },
  {
    opcode: 0x8f,
    operationInfo: addRegister8ToRegisterA(Register8.A, true),
  },
  {
    opcode: 0x90,
    operationInfo: subtractRegister8FromRegisterA(Register8.B),
  },
  {
    opcode: 0x91,
    operationInfo: subtractRegister8FromRegisterA(Register8.C),
  },
  {
    opcode: 0x92,
    operationInfo: subtractRegister8FromRegisterA(Register8.D),
  },
  {
    opcode: 0x93,
    operationInfo: subtractRegister8FromRegisterA(Register8.E),
  },
  {
    opcode: 0x94,
    operationInfo: subtractRegister8FromRegisterA(Register8.L),
  },
  {
    opcode: 0x95,
    operationInfo: subtractRegister8FromRegisterA(Register8.B),
  },
  {
    opcode: 0x96,
    operationInfo: subtractHlAddressFromRegisterA(),
  },
  {
    opcode: 0x97,
    operationInfo: subtractRegister8FromRegisterA(Register8.A),
  },
  {
    opcode: 0x98,
    operationInfo: subtractRegister8FromRegisterA(Register8.B, true),
  },
  {
    opcode: 0x99,
    operationInfo: subtractRegister8FromRegisterA(Register8.C, true),
  },
  {
    opcode: 0x9a,
    operationInfo: subtractRegister8FromRegisterA(Register8.D, true),
  },
  {
    opcode: 0x9b,
    operationInfo: subtractRegister8FromRegisterA(Register8.E, true),
  },
  {
    opcode: 0x9c,
    operationInfo: subtractRegister8FromRegisterA(Register8.L, true),
  },
  {
    opcode: 0x9d,
    operationInfo: subtractRegister8FromRegisterA(Register8.B, true),
  },
  {
    opcode: 0x9e,
    operationInfo: subtractHlAddressFromRegisterA(true),
  },
  {
    opcode: 0x9f,
    operationInfo: subtractRegister8FromRegisterA(Register8.A, true),
  },
  {
    opcode: 0xa0,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.B,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa1,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.C,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa2,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.D,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa3,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.E,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa4,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.L,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa5,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.B,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa6,
    operationInfo: logicalOperationHlAddressWithRegisterA(LogicalOperation.And),
  },
  {
    opcode: 0xa7,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.A,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa8,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.B,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xa9,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.C,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xaa,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.D,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xab,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.E,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xac,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.L,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xad,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.B,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xae,
    operationInfo: logicalOperationHlAddressWithRegisterA(LogicalOperation.Xor),
  },
  {
    opcode: 0xaf,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.A,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xb0,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.B,
      LogicalOperation.Or,
    ),
  },
  {
    opcode: 0xb1,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.C,
      LogicalOperation.Or,
    ),
  },
  {
    opcode: 0xb2,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.D,
      LogicalOperation.Or,
    ),
  },
  {
    opcode: 0xb3,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.E,
      LogicalOperation.Or,
    ),
  },
  {
    opcode: 0xb4,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.L,
      LogicalOperation.Or,
    ),
  },
  {
    opcode: 0xb5,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.B,
      LogicalOperation.Or,
    ),
  },
  {
    opcode: 0xb6,
    operationInfo: logicalOperationHlAddressWithRegisterA(LogicalOperation.Or),
  },
  {
    opcode: 0xb7,
    operationInfo: logicallyApplyRegister8ToRegisterA(
      Register8.A,
      LogicalOperation.Or,
    ),
  },
  {
    opcode: 0xb8,
    operationInfo: subtractRegister8FromRegisterA(Register8.B, false, false),
  },
  {
    opcode: 0xb9,
    operationInfo: subtractRegister8FromRegisterA(Register8.C, false, false),
  },
  {
    opcode: 0xba,
    operationInfo: subtractRegister8FromRegisterA(Register8.D, false, false),
  },
  {
    opcode: 0xbb,
    operationInfo: subtractRegister8FromRegisterA(Register8.E, false, false),
  },
  {
    opcode: 0xbc,
    operationInfo: subtractRegister8FromRegisterA(Register8.L, false, false),
  },
  {
    opcode: 0xbd,
    operationInfo: subtractRegister8FromRegisterA(Register8.B, false, false),
  },
  {
    opcode: 0xbe,
    operationInfo: subtractHlAddressFromRegisterA(false, false),
  },
  {
    opcode: 0xbf,
    operationInfo: subtractRegister8FromRegisterA(Register8.A, false, false),
  },
];

export default operations;
