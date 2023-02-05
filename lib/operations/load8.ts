import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';
import { Register16, Register8 } from '../registers';
import { Operation, OperationInfo } from './operation';

const loadHlAddressWithIncrementFromA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const hl = cpu.registers.getWord(Register16.HL);
    cpu.registers.incrementWord(Register16.HL);
    const a = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(hl, a);
  },
  length: 1,
  clock: new Clock(2),
};

const loadHlAddressWithDecrementFromA: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const hlAddress = cpu.registers.getWord(Register16.HL);
    cpu.registers.decrementWord(Register16.HL, -1);
    const a = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(hlAddress, a);
  },
  length: 1,
  clock: new Clock(2),
};

const loadRegister8FromByte = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const byte = cpu.fetchByte();
      cpu.registers.setByte(register8, byte);
    },
    length: 2,
    clock: new Clock(2),
  };
};

const loadHlAddressFromByte: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const byte = cpu.fetchByte();
    const hlAddress = cpu.registers.getWord(Register16.HL);
    cpu.memory.setByte(hlAddress, byte);
  },
  length: 2,
  clock: new Clock(2),
};

const loadAFromRegisterAddress = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(register16);
      const byte = cpu.memory.getByte(address);
      cpu.registers.setByte(Register8.A, byte);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const loadAFromHlAddressWithIncrement: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const hl = cpu.registers.getWord(Register16.HL);
    cpu.registers.incrementWord(Register16.HL);
    cpu.memory.setByte(a, hl);
  },
  length: 1,
  clock: new Clock(2),
};

const loadAFromHlAddressWithDecrement: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const a = cpu.registers.getByte(Register8.A);
    const hl = cpu.registers.getWord(Register16.HL);
    cpu.registers.decrementWord(Register16.HL);
    cpu.memory.setByte(a, hl);
  },
  length: 1,
  clock: new Clock(2),
};

const loadRegister8FromRegister8 = (
  targetRegister8: Register8,
  sourceRegister8: Register8,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.registers.setRegister8(targetRegister8, sourceRegister8);
    },
    length: 1,
    clock: new Clock(1),
  };
};

const loadRegister8FromHlAddress = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.memory.getByte(address);
      cpu.registers.setByte(register8, byte);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const loadHlAddressFromRegister8 = (register8: Register8): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(Register16.HL);
      const byte = cpu.registers.getByte(register8);
      cpu.memory.setByte(address, byte);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const loadIoAddressWithByteOffsetFromRegisterA = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.fetchByte();
    const address = 0xff00 + offset;
    const byte = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(address, byte);
  },
  length: 2,
  clock: new Clock(3),
};

const loadRegisterAFromIoAddressWithByteOffset = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.fetchByte();
    const address = 0xff00 + offset;
    const byte = cpu.memory.getByte(address);
    cpu.registers.setByte(Register8.A, byte);
  },
  length: 2,
  clock: new Clock(3),
};

const loadIoAddressWithCOffsetFromA = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.registers.getByte(Register8.C);
    const address = 0xff00 + offset;
    const byte = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(address, byte);
  },
  length: 1,
  clock: new Clock(2),
};

const loadAFromIoAddressWithCOffset = {
  operation: (cpu: GameboyCpu) => {
    const offset = cpu.registers.getByte(Register8.C);
    const address = 0xff00 + offset;
    const byte = cpu.memory.getByte(address);
    cpu.registers.setByte(Register8.A, byte);
  },
  length: 1,
  clock: new Clock(2),
};

const loadAddressFromA = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.fetchWord();
    const byte = cpu.registers.getByte(Register8.A);
    cpu.memory.setByte(address, byte);
  },
  length: 3,
  clock: new Clock(4),
};

const loadAFromAddress = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.fetchWord();
    const byte = cpu.memory.getByte(address);
    cpu.registers.setByte(Register8.A, byte);
  },
  length: 3,
  clock: new Clock(4),
};

const operations: Operation[] = [
  {
    opcode: 0x22,
    operationInfo: loadHlAddressWithIncrementFromA,
  },
  {
    opcode: 0x32,
    operationInfo: loadHlAddressWithDecrementFromA,
  },
  {
    opcode: 0x06,
    operationInfo: loadRegister8FromByte(Register8.B),
  },
  {
    opcode: 0x16,
    operationInfo: loadRegister8FromByte(Register8.D),
  },
  {
    opcode: 0x26,
    operationInfo: loadRegister8FromByte(Register8.H),
  },
  {
    opcode: 0x36,
    operationInfo: loadHlAddressFromByte,
  },
  {
    opcode: 0x0a,
    operationInfo: loadAFromRegisterAddress(Register16.BC),
  },
  {
    opcode: 0x1a,
    operationInfo: loadAFromRegisterAddress(Register16.DE),
  },
  {
    opcode: 0x2a,
    operationInfo: loadAFromHlAddressWithIncrement,
  },
  {
    opcode: 0x3a,
    operationInfo: loadAFromHlAddressWithDecrement,
  },
  {
    opcode: 0x0e,
    operationInfo: loadRegister8FromByte(Register8.C),
  },
  {
    opcode: 0x1e,
    operationInfo: loadRegister8FromByte(Register8.E),
  },
  {
    opcode: 0x2e,
    operationInfo: loadRegister8FromByte(Register8.L),
  },
  {
    opcode: 0x3e,
    operationInfo: loadRegister8FromByte(Register8.A),
  },
  {
    opcode: 0x40,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.B),
  },
  {
    opcode: 0x41,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.C),
  },
  {
    opcode: 0x42,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.D),
  },
  {
    opcode: 0x43,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.E),
  },
  {
    opcode: 0x44,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.H),
  },
  {
    opcode: 0x45,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.L),
  },
  {
    opcode: 0x46,
    operationInfo: loadRegister8FromHlAddress(Register8.B),
  },
  {
    opcode: 0x47,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.A),
  },
  {
    opcode: 0x48,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.B),
  },
  {
    opcode: 0x49,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.C),
  },
  {
    opcode: 0x4a,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.D),
  },
  {
    opcode: 0x4b,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.E),
  },
  {
    opcode: 0x4c,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.H),
  },
  {
    opcode: 0x4d,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.L),
  },
  {
    opcode: 0x4e,
    operationInfo: loadRegister8FromHlAddress(Register8.C),
  },
  {
    opcode: 0x4f,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.A),
  },
  {
    opcode: 0x50,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.B),
  },
  {
    opcode: 0x51,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.C),
  },
  {
    opcode: 0x52,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.D),
  },
  {
    opcode: 0x53,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.E),
  },
  {
    opcode: 0x54,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.H),
  },
  {
    opcode: 0x55,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.L),
  },
  {
    opcode: 0x56,
    operationInfo: loadRegister8FromHlAddress(Register8.D),
  },
  {
    opcode: 0x57,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.A),
  },
  {
    opcode: 0x58,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.B),
  },
  {
    opcode: 0x59,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.C),
  },
  {
    opcode: 0x5a,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.D),
  },
  {
    opcode: 0x5b,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.E),
  },
  {
    opcode: 0x5c,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.H),
  },
  {
    opcode: 0x5d,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.L),
  },
  {
    opcode: 0x5e,
    operationInfo: loadRegister8FromHlAddress(Register8.E),
  },
  {
    opcode: 0x5f,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.A),
  },
  {
    opcode: 0x60,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.B),
  },
  {
    opcode: 0x61,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.C),
  },
  {
    opcode: 0x62,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.D),
  },
  {
    opcode: 0x63,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.E),
  },
  {
    opcode: 0x64,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.H),
  },
  {
    opcode: 0x65,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.L),
  },
  {
    opcode: 0x66,
    operationInfo: loadRegister8FromHlAddress(Register8.H),
  },
  {
    opcode: 0x67,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.A),
  },
  {
    opcode: 0x68,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.B),
  },
  {
    opcode: 0x69,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.C),
  },
  {
    opcode: 0x6a,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.D),
  },
  {
    opcode: 0x6b,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.E),
  },
  {
    opcode: 0x6c,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.H),
  },
  {
    opcode: 0x6d,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.L),
  },
  {
    opcode: 0x6e,
    operationInfo: loadRegister8FromHlAddress(Register8.L),
  },
  {
    opcode: 0x6f,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.A),
  },
  {
    opcode: 0x70,
    operationInfo: loadHlAddressFromRegister8(Register8.B),
  },
  {
    opcode: 0x71,
    operationInfo: loadHlAddressFromRegister8(Register8.C),
  },
  {
    opcode: 0x72,
    operationInfo: loadHlAddressFromRegister8(Register8.D),
  },
  {
    opcode: 0x73,
    operationInfo: loadHlAddressFromRegister8(Register8.E),
  },
  {
    opcode: 0x74,
    operationInfo: loadHlAddressFromRegister8(Register8.H),
  },
  {
    opcode: 0x75,
    operationInfo: loadHlAddressFromRegister8(Register8.L),
  },
  {
    opcode: 0x77,
    operationInfo: loadHlAddressFromRegister8(Register8.A),
  },
  {
    opcode: 0x78,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.B),
  },
  {
    opcode: 0x79,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.C),
  },
  {
    opcode: 0x7a,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.D),
  },
  {
    opcode: 0x7b,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.E),
  },
  {
    opcode: 0x7c,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.H),
  },
  {
    opcode: 0x7d,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.L),
  },
  {
    opcode: 0x7e,
    operationInfo: loadRegister8FromHlAddress(Register8.A),
  },
  {
    opcode: 0xe0,
    operationInfo: loadIoAddressWithByteOffsetFromRegisterA,
  },
  {
    opcode: 0xf0,
    operationInfo: loadRegisterAFromIoAddressWithByteOffset,
  },
  {
    opcode: 0xe2,
    operationInfo: loadIoAddressWithCOffsetFromA,
  },
  {
    opcode: 0xf2,
    operationInfo: loadAFromIoAddressWithCOffset,
  },
  {
    opcode: 0xea,
    operationInfo: loadAddressFromA,
  },
  {
    opcode: 0xfa,
    operationInfo: loadAFromAddress,
  },
];

export default operations;