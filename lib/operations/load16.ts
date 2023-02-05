import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';
import { Register16, Register8 } from '../registers';
import { Operation, OperationInfo } from './operation';

const loadRegister16FromWord = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const word = cpu.fetchWord();
      cpu.registers.setWord(register16, word);
    },
    length: 3,
    clock: new Clock(3),
  };
};

const loadRegister16AddressFromA = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.registers.getWord(register16);
      const a = cpu.registers.getByte(Register8.A);
      cpu.memory.setByte(address, a);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const loadAddressFromSp: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.fetchWord();
    const sp = cpu.registers.getWord(Register16.SP);
    cpu.memory.setWord(address, sp);
  },
  length: 3,
  clock: new Clock(5),
};

const popToRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.popSp(register16);
    },
    length: 1,
    clock: new Clock(3),
  };
};

const pushFromRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.pushSp(register16);
    },
    length: 1,
    clock: new Clock(3),
  };
};

const loadSpFromHl = {
  operation: (cpu: GameboyCpu) => {
    cpu.registers.setRegister16(Register16.HL, Register16.SP);
  },
  length: 1,
  clock: new Clock(2),
};

const operations: Operation[] = [
  {
    opcode: 0x01,
    operationInfo: loadRegister16FromWord(Register16.BC),
  },
  {
    opcode: 0x11,
    operationInfo: loadRegister16FromWord(Register16.DE),
  },
  {
    opcode: 0x21,
    operationInfo: loadRegister16FromWord(Register16.HL),
  },
  {
    opcode: 0x31,
    operationInfo: loadRegister16FromWord(Register16.SP),
  },
  {
    opcode: 0x02,
    operationInfo: loadRegister16AddressFromA(Register16.BC),
  },
  {
    opcode: 0x12,
    operationInfo: loadRegister16AddressFromA(Register16.DE),
  },
  {
    opcode: 0x08,
    operationInfo: loadAddressFromSp,
  },
  {
    opcode: 0xc1,
    operationInfo: popToRegister16(Register16.BC),
  },
  {
    opcode: 0xc2,
    operationInfo: popToRegister16(Register16.DE),
  },
  {
    opcode: 0xc3,
    operationInfo: popToRegister16(Register16.HL),
  },
  {
    opcode: 0xc4,
    operationInfo: popToRegister16(Register16.AF),
  },
  {
    opcode: 0xc5,
    operationInfo: pushFromRegister16(Register16.BC),
  },
  {
    opcode: 0xd5,
    operationInfo: pushFromRegister16(Register16.DE),
  },
  {
    opcode: 0xd5,
    operationInfo: pushFromRegister16(Register16.HL),
  },
  {
    opcode: 0xd5,
    operationInfo: pushFromRegister16(Register16.AF),
  },
  {
    opcode: 0xf9,
    operationInfo: loadSpFromHl,
  },
];

export default operations;
