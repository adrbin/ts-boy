import { ClockData } from '../../clock-data.js';
import { GameboyCpu } from '../../gameboy-cpu.js';
import { Flag, Register16, Register8 } from '../../registers.js';
import {
  hasByteSumCarry,
  hasByteSumHalfCarry,
  isByteSumZero,
  toByte,
  toNibble,
} from '../../utils.js';
import { OperationInfo } from '../operation.js';

export const incrementRegister8 = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.registers.getByte(register8);

      cpu.registers.incrementByte(register8);

      setIncrementFlags(cpu, byte);
    },
    length: 1,
    clock: new ClockData(1),
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
    clock: new ClockData(1),
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
  clock: new ClockData(1),
};

export const decrementHlAddress: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);

    cpu.memory.setByte(address, toByte(byte - 1));

    setDecrementFlags(cpu, byte);
  },
  length: 1,
  clock: new ClockData(1),
};

const setIncrementFlags = (cpu: GameboyCpu, byte: number) => {
  const flags = {
    [Flag.Zero]: isByteSumZero(byte, 1),
    [Flag.Negative]: false,
    [Flag.HalfCarry]: hasByteSumHalfCarry(byte, 1),
  };

  cpu.registers.setFlags(flags);
};

const setDecrementFlags = (cpu: GameboyCpu, byte: number) => {
  const flags = {
    [Flag.Zero]: isByteSumZero(byte, -1),
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
  clock: new ClockData(1),
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
  clock: new ClockData(1),
};

export const setCarryFlag: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const flags = {
      [Flag.Negative]: false,
      [Flag.HalfCarry]: false,
      [Flag.Carry]: true,
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new ClockData(1),
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
  clock: new ClockData(1),
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
    clock: new ClockData(1),
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
    clock: new ClockData(2),
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
    clock: new ClockData(1),
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
    clock: new ClockData(2),
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
    [Flag.Zero]: isByteSumZero(a, byte, carry),
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
    clock: new ClockData(1),
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
    clock: new ClockData(2),
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
    clock: new ClockData(2),
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
    clock: new ClockData(2),
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
    [Flag.Zero]: isByteSumZero(a, byte, carry),
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
    clock: new ClockData(1),
  };
};
