import { ClockData } from '../../clock-data.js';
import { GameboyCpu } from '../../gameboy-cpu.js';
import { OperationInfo } from '../operation.js';
import prefixCbOperations from '../prefixCb/operationCodes.js';

export const nop: OperationInfo = {
  operation: () => { },
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
    cpu.ime = false;
  },
  length: 1,
  clock: new ClockData(1),
};

export const enableInterrupts: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.ime = true;
  },
  length: 1,
  clock: new ClockData(1),
};

export const prefixCb: OperationInfo = {
  operation: () => { },
  length: 1,
  clock: new ClockData(1),
};
