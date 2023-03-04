import { ClockData } from '../../clock-data';
import { GameboyCpu } from '../../gameboy-cpu';
import { Flags, Register16 } from '../../registers';
import { toSignedByte } from '../../utils';
import { OperationInfo } from '../operation';

export const jumpRelativeWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const unsignedByte = cpu.fetchByte();
      const signedByte = toSignedByte(unsignedByte);
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.registers.incrementWord(Register16.PC, signedByte);
        cpu.hasBranched = true;
      }
    },
    length: 2,
    clock: new ClockData(2),
    clockWithBranching: new ClockData(3),
  };
};

export const returnWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.popSp(Register16.PC);
        cpu.hasBranched = true;
      }
    },
    length: 1,
    clock: new ClockData(2),
    clockWithBranching: new ClockData(5),
  };
};

export const returnWithoutInterrupt: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.popSp(Register16.PC);
  },
  length: 1,
  clock: new ClockData(4),
};

export const returnWithInterrupt: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.popSp(Register16.PC);
    throw new Error('Interrupts not implemented yet');
  },
  length: 1,
  clock: new ClockData(4),
};

export const jumpWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.fetchWord();
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.registers.setWord(Register16.PC, address);
        cpu.hasBranched = true;
      }
    },
    length: 3,
    clock: new ClockData(3),
    clockWithBranching: new ClockData(4),
  };
};

export const jumpFromHl: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const address = cpu.registers.getWord(Register16.HL);
    cpu.registers.incrementWord(Register16.PC, address);
  },
  length: 1,
  clock: new ClockData(1),
};

export const callWithCondition = (
  condition: (flags: Flags) => boolean,
): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      const address = cpu.fetchWord();
      const flags = cpu.registers.getFlags();

      if (condition(flags)) {
        cpu.pushSp(Register16.PC);
        cpu.registers.setWord(Register16.PC, address);
        cpu.hasBranched = true;
      }
    },
    length: 3,
    clock: new ClockData(3),
    clockWithBranching: new ClockData(4),
  };
};

export const reset = (address: number): OperationInfo => {
  return {
    operation: (cpu: GameboyCpu) => {
      cpu.pushSp(Register16.PC);
      cpu.registers.setWord(Register16.PC, address);
    },
    length: 1,
    clock: new ClockData(4),
  };
};
