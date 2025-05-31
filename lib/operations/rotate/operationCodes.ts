import { buildOperationCodeMap, OperationCode } from '../operation.js';
import { rotateLeftA, RotateMode, rotateRightA } from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x07,
    mnemonic: 'RLCA',
    operationInfo: rotateLeftA(RotateMode.Normal),
  },
  {
    opcode: 0x17,
    mnemonic: 'RLA',
    operationInfo: rotateLeftA(RotateMode.ThroughCarry),
  },
  {
    opcode: 0x0f,
    mnemonic: 'RRCA',
    operationInfo: rotateRightA(RotateMode.Normal),
  },
  {
    opcode: 0x1f,
    mnemonic: 'RRA',
    operationInfo: rotateRightA(RotateMode.ThroughCarry),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
