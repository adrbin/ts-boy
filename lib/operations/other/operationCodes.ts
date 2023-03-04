import { buildOperationCodeMap, OperationCode } from '../operation';
import {
  nop,
  stop,
  halt,
  disableInterrupts,
  enableInterrupts,
  prefixCb,
} from './operationInfos';

const operationCodes: OperationCode[] = [
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

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
