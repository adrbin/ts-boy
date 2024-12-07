import { ClockData } from '../../clock-data.js';
import { GameboyCpu } from '../../gameboy-cpu.js';
import { OperationInfo } from '../operation.js';
import prefixCbOperations from '../prefixCb/operationCodes.js';

export const nop: OperationInfo = {
  operation: () => {},
  length: 1,
  clock: new ClockData(1),
};

export const stop: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.isStopped = true;
  },
  length: 1,
  clock: new ClockData(1),
};

export const halt: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.isHalted = true;
  },
  length: 1,
  clock: new ClockData(1),
};

export const disableInterrupts: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    throw new Error('Interrupts not implemented yet');
  },
  length: 1,
  clock: new ClockData(1),
};

export const enableInterrupts: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    throw new Error('Interrupts not implemented yet');
  },
  length: 1,
  clock: new ClockData(1),
};

export const prefixCb: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    const opcode = cpu.fetchByte();
    const operationInfo = prefixCbOperations.get(opcode)?.operationInfo;
    if (operationInfo === undefined) {
      throw new Error(`Unknown prefixCb opcode ${opcode}`);
    }
    operationInfo.operation(cpu);
    cpu.clock.increment(operationInfo.clock);
  },
  length: 1,
  clock: new ClockData(1),
};
