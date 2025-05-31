import { buildOperationCodeMap, OperationCode } from '../operation.js';
import {
  nop,
  stop,
  halt,
  disableInterrupts,
  enableInterrupts,
  prefixCb,
} from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x00,
    mnemonic: 'NOP',
    operationInfo: nop,
  },
  {
    opcode: 0x10,
    mnemonic: 'STOP',
    operationInfo: stop,
  },
  {
    opcode: 0x76,
    mnemonic: 'HALT',
    operationInfo: halt,
  },
  {
    opcode: 0xf3,
    mnemonic: 'DI',
    operationInfo: disableInterrupts,
  },
  {
    opcode: 0xfb,
    mnemonic: 'EI',
    operationInfo: enableInterrupts,
  },
  {
    opcode: 0xcb,
    mnemonic: 'PREFIX CB',
    operationInfo: prefixCb,
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
