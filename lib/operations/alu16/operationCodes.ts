import { Register16 } from '../../registers.js';
import { buildOperationCodeMap, OperationCode } from '../operation.js';
import {
  incrementRegister16,
  addRegister16ToHl,
  decrementRegister16,
  addByteToSp,
  loadHlFromSpWithByte,
} from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x03,
    operationInfo: incrementRegister16(Register16.BC),
  },
  {
    opcode: 0x13,
    operationInfo: incrementRegister16(Register16.DE),
  },
  {
    opcode: 0x23,
    operationInfo: incrementRegister16(Register16.HL),
  },
  {
    opcode: 0x33,
    operationInfo: incrementRegister16(Register16.SP),
  },
  {
    opcode: 0x09,
    operationInfo: addRegister16ToHl(Register16.BC),
  },
  {
    opcode: 0x19,
    operationInfo: addRegister16ToHl(Register16.DE),
  },
  {
    opcode: 0x29,
    operationInfo: addRegister16ToHl(Register16.HL),
  },
  {
    opcode: 0x39,
    operationInfo: addRegister16ToHl(Register16.SP),
  },
  {
    opcode: 0x0b,
    operationInfo: decrementRegister16(Register16.BC),
  },
  {
    opcode: 0x1b,
    operationInfo: decrementRegister16(Register16.DE),
  },
  {
    opcode: 0x2b,
    operationInfo: decrementRegister16(Register16.HL),
  },
  {
    opcode: 0x3b,
    operationInfo: decrementRegister16(Register16.SP),
  },
  {
    opcode: 0xe8,
    operationInfo: addByteToSp,
  },
  {
    opcode: 0xf8,
    operationInfo: loadHlFromSpWithByte,
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
