import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';
import { OperationCode, OperationInfo } from './operation';

const nop: OperationInfo = {
  operation: () => {},
  length: 1,
  clock: new Clock(1),
};

const stop: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.isStopped = true;
  },
  length: 1,
  clock: new Clock(1),
};

const halt: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    cpu.isHalted = true;
  },
  length: 1,
  clock: new Clock(1),
};

const disableInterrupts: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    throw new Error('Interrupts not implemented yet');
  },
  length: 1,
  clock: new Clock(1),
};

const enableInterrupts: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    throw new Error('Interrupts not implemented yet');
  },
  length: 1,
  clock: new Clock(1),
};

const prefixCb: OperationInfo = {
  operation: (cpu: GameboyCpu) => {
    throw new Error('PrefixCb not implemented yet');
  },
  length: 1,
  clock: new Clock(1),
};

const operations: OperationCode[] = [
  {
    opcode: 0x00,
    operationInfo: nop,
  },
  {
    opcode: 0x10,
    operationInfo: stop,
  },
  {
    opcode: 0x76,
    operationInfo: halt,
  },
  {
    opcode: 0xf3,
    operationInfo: disableInterrupts,
  },
  {
    opcode: 0xfb,
    operationInfo: enableInterrupts,
  },
  {
    opcode: 0xcb,
    operationInfo: prefixCb,
  },
];

export default operations;
