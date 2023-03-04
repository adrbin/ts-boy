import { buildOperationCodeMap, OperationCode } from '../operation';
import { rotateLeftA, RotateMode, rotateRightA } from './operationInfos';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x07,
    operationInfo: rotateLeftA(RotateMode.Normal),
  },
  {
    opcode: 0x0e,
    operationInfo: rotateRightA(RotateMode.Normal),
  },
  {
    opcode: 0x17,
    operationInfo: rotateLeftA(RotateMode.ThroughCarry),
  },
  {
    opcode: 0x1e,
    operationInfo: rotateRightA(RotateMode.ThroughCarry),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
