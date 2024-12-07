import { buildOperationCodeMap, OperationCode } from '../operation.js';
import { rotateLeftA, RotateMode, rotateRightA } from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x07,
    operationInfo: rotateLeftA(RotateMode.Normal),
  },
  {
    opcode: 0x17,
    operationInfo: rotateLeftA(RotateMode.ThroughCarry),
  },
  {
    opcode: 0x0f,
    operationInfo: rotateRightA(RotateMode.Normal),
  },
  {
    opcode: 0x1f,
    operationInfo: rotateRightA(RotateMode.ThroughCarry),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
