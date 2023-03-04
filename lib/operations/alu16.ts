import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';
import { Flag, Register16 } from '../registers';
import {
  hasByteSumCarry,
  hasByteSumHalfCarry,
  hasWordSumCarry,
  hasWordSumHalfCarry,
  toSignedByte,
  toWord,
} from '../utils';
import { OperationCode, OperationInfo } from './operation';

const incrementRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.registers.incrementWord(register16);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const decrementRegister16 = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.registers.decrementWord(register16);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const addRegister16ToHl = (register16: Register16): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const hl = cpu.registers.getWord(Register16.HL);
      const word = cpu.registers.getWord(register16);

      cpu.registers.incrementWord(Register16.HL, word);

      const flags = {
        [Flag.Negative]: false,
        [Flag.HalfCarry]: hasWordSumHalfCarry(hl, word),
        [Flag.Carry]: hasWordSumCarry(hl, word),
      };

      cpu.registers.setFlags(flags);
    },
    length: 1,
    clock: new Clock(2),
  };
};

const addByteToSp: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const sp = cpu.registers.getWord(Register16.SP);
    const unsignedByte = cpu.fetchByte();
    const signedByte = toSignedByte(unsignedByte);

    cpu.registers.incrementWord(Register16.SP, signedByte);

    setSpFlags(cpu, sp, signedByte);
  },
  length: 2,
  clock: new Clock(4),
};

const loadHlFromSpWithByte: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const sp = cpu.registers.getWord(Register16.SP);
    const unsignedByte = cpu.fetchByte();
    const signedByte = toSignedByte(unsignedByte);
    const sum = toWord(sp + signedByte);

    cpu.registers.setWord(Register16.HL, sum);

    setSpFlags(cpu, sp, signedByte);
  },
  length: 2,
  clock: new Clock(3),
};

const setSpFlags = (cpu: GameboyCpu, sp: number, signedByte: number) => {
  const flags = {
    [Flag.Zero]: false,
    [Flag.Negative]: false,
    [Flag.HalfCarry]: hasByteSumHalfCarry(sp, signedByte),
    [Flag.Carry]: hasByteSumCarry(sp, signedByte),
  };

  cpu.registers.setFlags(flags);
};

const operations: OperationCode[] = [
  {
    opcode: 0x03,
    operationInfo: incrementRegister16(Register16.BC),
  },
  {
    opcode: 0x13,
    operationInfo: incrementRegister16(Register16.DE),
  },
  {
    opcode: 0x23,
    operationInfo: incrementRegister16(Register16.HL),
  },
  {
    opcode: 0x33,
    operationInfo: incrementRegister16(Register16.SP),
  },
  {
    opcode: 0x09,
    operationInfo: addRegister16ToHl(Register16.BC),
  },
  {
    opcode: 0x19,
    operationInfo: addRegister16ToHl(Register16.DE),
  },
  {
    opcode: 0x29,
    operationInfo: addRegister16ToHl(Register16.HL),
  },
  {
    opcode: 0x39,
    operationInfo: addRegister16ToHl(Register16.SP),
  },
  {
    opcode: 0x0b,
    operationInfo: decrementRegister16(Register16.BC),
  },
  {
    opcode: 0x1b,
    operationInfo: decrementRegister16(Register16.DE),
  },
  {
    opcode: 0x2b,
    operationInfo: decrementRegister16(Register16.HL),
  },
  {
    opcode: 0x3b,
    operationInfo: decrementRegister16(Register16.SP),
  },
  {
    opcode: 0xe9,
    operationInfo: addByteToSp,
  },
  {
    opcode: 0xf8,
    operationInfo: loadHlFromSpWithByte,
  },
];

export default operations;
