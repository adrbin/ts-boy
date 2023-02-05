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

const addRegister8ToRegisterA = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.registers.getByte(register8);

      cpu.registers.incrementByte(Register8.A, byte);

      const flags = {
        [Flag.Zero]: isSumZero(a, byte),
        [Flag.Negative]: false,
        [Flag.HalfCarry]: hasByteSumHalfCarry(a, byte),
        [Flag.Carry]: hasByteSumCarry(a, byte),
      };

      cpu.registers.setFlags(flags);
    },
    length: 1,
    clock: new Clock(1),
  };
};

const addHlAddressToRegisterA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);

    cpu.registers.incrementByte(Register8.A, byte);

    const flags = {
      [Flag.Zero]: isSumZero(a, byte),
      [Flag.Negative]: false,
      [Flag.HalfCarry]: hasByteSumHalfCarry(a, byte),
      [Flag.Carry]: hasByteSumCarry(a, byte),
    };

    cpu.registers.setFlags(flags);
  },
  length: 1,
  clock: new Clock(1),
};

const addWithCarryRegister8ToRegisterA = (
  register8: Register8,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const a = cpu.registers.getByte(Register8.A);
      const byte = cpu.registers.getByte(register8);
      const oldFlags = cpu.registers.getFlags();
      const carry = oldFlags[Flag.Carry] ? 1 : 0;

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

const addWithCarryHlAddressToRegisterA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const address = cpu.registers.getWord(Register16.HL);
    const byte = cpu.memory.getByte(address);
    const oldFlags = cpu.registers.getFlags();
    const carry = oldFlags[Flag.Carry] ? 1 : 0;

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
    operationInfo: addHlAddressToRegisterA,
  },
  {
    opcode: 0x87,
    operationInfo: addRegister8ToRegisterA(Register8.A),
  },
  {
    opcode: 0x88,
    operationInfo: addWithCarryRegister8ToRegisterA(Register8.B),
  },
  {
    opcode: 0x89,
    operationInfo: addWithCarryRegister8ToRegisterA(Register8.C),
  },
  {
    opcode: 0x8a,
    operationInfo: addWithCarryRegister8ToRegisterA(Register8.D),
  },
  {
    opcode: 0x8b,
    operationInfo: addWithCarryRegister8ToRegisterA(Register8.E),
  },
  {
    opcode: 0x8c,
    operationInfo: addWithCarryRegister8ToRegisterA(Register8.L),
  },
  {
    opcode: 0x8d,
    operationInfo: addWithCarryRegister8ToRegisterA(Register8.B),
  },
  {
    opcode: 0x8e,
    operationInfo: addWithCarryHlAddressToRegisterA,
  },
  {
    opcode: 0x8f,
    operationInfo: addWithCarryRegister8ToRegisterA(Register8.A),
  },
];

export default operations;
