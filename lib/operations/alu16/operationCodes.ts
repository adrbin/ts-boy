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
    mnemonic: 'INC BC',
    operationInfo: incrementRegister16(Register16.BC),
  },
  {
    opcode: 0x13,
    mnemonic: 'INC DE',
    operationInfo: incrementRegister16(Register16.DE),
  },
  {
    opcode: 0x23,
    mnemonic: 'INC HL',
    operationInfo: incrementRegister16(Register16.HL),
  },
  {
    opcode: 0x33,
    mnemonic: 'INC SP',
    operationInfo: incrementRegister16(Register16.SP),
  },
  {
    opcode: 0x09,
    mnemonic: 'ADD HL, BC',
    operationInfo: addRegister16ToHl(Register16.BC),
  },
  {
    opcode: 0x19,
    mnemonic: 'ADD HL, DE',
    operationInfo: addRegister16ToHl(Register16.DE),
  },
  {
    opcode: 0x29,
    mnemonic: 'ADD HL, HL',
    operationInfo: addRegister16ToHl(Register16.HL),
  },
  {
    opcode: 0x39,
    mnemonic: 'ADD HL, SP',
    operationInfo: addRegister16ToHl(Register16.SP),
  },
  {
    opcode: 0x0b,
    mnemonic: 'DEC BC',
    operationInfo: decrementRegister16(Register16.BC),
  },
  {
    opcode: 0x1b,
    mnemonic: 'DEC DE',
    operationInfo: decrementRegister16(Register16.DE),
  },
  {
    opcode: 0x2b,
    mnemonic: 'DEC HL',
    operationInfo: decrementRegister16(Register16.HL),
  },
  {
    opcode: 0x3b,
    mnemonic: 'DEC SP',
    operationInfo: decrementRegister16(Register16.SP),
  },
  {
    opcode: 0xe8,
    mnemonic: 'ADD SP, {}',
    operationInfo: addByteToSp,
  },
  {
    opcode: 0xf8,
    mnemonic: 'LD HL, SP+{}',
    operationInfo: loadHlFromSpWithByte,
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
