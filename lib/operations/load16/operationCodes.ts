import { Register16 } from '../../registers';
import { buildOperationCodeMap, OperationCode } from '../operation';
import {
  loadRegister16FromWord,
  loadRegister16AddressFromA,
  loadAddressFromSp,
  popToRegister16,
  pushFromRegister16,
  loadSpFromHl,
} from './operationInfos';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x01,
    operationInfo: loadRegister16FromWord(Register16.BC),
  },
  {
    opcode: 0x11,
    operationInfo: loadRegister16FromWord(Register16.DE),
  },
  {
    opcode: 0x21,
    operationInfo: loadRegister16FromWord(Register16.HL),
  },
  {
    opcode: 0x31,
    operationInfo: loadRegister16FromWord(Register16.SP),
  },
  {
    opcode: 0x02,
    operationInfo: loadRegister16AddressFromA(Register16.BC),
  },
  {
    opcode: 0x12,
    operationInfo: loadRegister16AddressFromA(Register16.DE),
  },
  {
    opcode: 0x08,
    operationInfo: loadAddressFromSp,
  },
  {
    opcode: 0xc1,
    operationInfo: popToRegister16(Register16.BC),
  },
  {
    opcode: 0xc2,
    operationInfo: popToRegister16(Register16.DE),
  },
  {
    opcode: 0xc3,
    operationInfo: popToRegister16(Register16.HL),
  },
  {
    opcode: 0xc4,
    operationInfo: popToRegister16(Register16.AF),
  },
  {
    opcode: 0xc5,
    operationInfo: pushFromRegister16(Register16.BC),
  },
  {
    opcode: 0xd5,
    operationInfo: pushFromRegister16(Register16.DE),
  },
  {
    opcode: 0xd5,
    operationInfo: pushFromRegister16(Register16.HL),
  },
  {
    opcode: 0xd5,
    operationInfo: pushFromRegister16(Register16.AF),
  },
  {
    opcode: 0xf9,
    operationInfo: loadSpFromHl,
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
