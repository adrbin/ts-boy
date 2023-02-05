import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';
import { Flag, Flags, Register16, Register8 } from '../registers';
import { toSignedByte } from '../utils';
import { Operation, OperationInfo } from './operation';

const jumpRelativeWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const unsignedByte = cpu.fetchByte();
      const signedByte = toSignedByte(unsignedByte);
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.registers.incrementWord(Register16.PC, signedByte);
        cpu.didBranch = true;
      }
    },
    length: 2,
    clock: new Clock(2),
    clockWithBranching: new Clock(3),
  };
};

const returnWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.popSp(Register16.PC);
        cpu.didBranch = true;
      }
    },
    length: 1,
    clock: new Clock(2),
    clockWithBranching: new Clock(5),
  };
};

const returnWithoutInterrupt: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.popSp(Register16.PC);
  },
  length: 1,
  clock: new Clock(4),
};

const returnWithInterrupt: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.popSp(Register16.PC);
    throw new Error('Interrupts not implemented yet');
  },
  length: 1,
  clock: new Clock(4),
};

const jumpWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.fetchWord();
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.registers.setWord(Register16.PC, address);
        cpu.didBranch = true;
      }
    },
    length: 3,
    clock: new Clock(3),
    clockWithBranching: new Clock(4),
  };
};

const jumpFromHl: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    cpu.registers.incrementWord(Register16.PC, address);
  },
  length: 1,
  clock: new Clock(1),
};

const callWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.fetchWord();
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.pushSp(Register16.PC);
        cpu.registers.setWord(Register16.PC, address);
        cpu.didBranch = true;
      }
    },
    length: 3,
    clock: new Clock(3),
    clockWithBranching: new Clock(4),
  };
};

const reset = (address: number): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.pushSp(Register16.PC);
      cpu.registers.setWord(Register16.PC, address);
    },
    length: 1,
    clock: new Clock(4),
  };
};

const operations: Operation[] = [
  {
    opcode: 0x20,
    operationInfo: jumpRelativeWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0x30,
    operationInfo: jumpRelativeWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0x18,
    operationInfo: jumpRelativeWithCondition(_ => true),
  },
  {
    opcode: 0x28,
    operationInfo: jumpRelativeWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0x38,
    operationInfo: jumpRelativeWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc0,
    operationInfo: returnWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd0,
    operationInfo: returnWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xc8,
    operationInfo: returnWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xd8,
    operationInfo: returnWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc9,
    operationInfo: returnWithoutInterrupt,
  },
  {
    opcode: 0xd9,
    operationInfo: returnWithInterrupt,
  },
  {
    opcode: 0xc2,
    operationInfo: jumpWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd2,
    operationInfo: jumpWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xc3,
    operationInfo: jumpWithCondition(_ => true),
  },
  {
    opcode: 0xc8,
    operationInfo: jumpWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xd8,
    operationInfo: jumpWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xe9,
    operationInfo: jumpFromHl,
  },
  {
    opcode: 0xc4,
    operationInfo: callWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd4,
    operationInfo: callWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xcd,
    operationInfo: callWithCondition(_ => true),
  },
  {
    opcode: 0xcc,
    operationInfo: callWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xdc,
    operationInfo: callWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc7,
    operationInfo: reset(0x00),
  },
  {
    opcode: 0xd7,
    operationInfo: reset(0x10),
  },
  {
    opcode: 0xe7,
    operationInfo: reset(0x20),
  },
  {
    opcode: 0xf7,
    operationInfo: reset(0x30),
  },
  {
    opcode: 0xcf,
    operationInfo: reset(0x08),
  },
  {
    opcode: 0xdf,
    operationInfo: reset(0x18),
  },
  {
    opcode: 0xef,
    operationInfo: reset(0x28),
  },
  {
    opcode: 0xff,
    operationInfo: reset(0x38),
  },
];

export default operations;
