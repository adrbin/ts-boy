import { Register16 } from '../../registers.js';
import { buildOperationCodeMap, OperationCode } from '../operation.js';
import {
  loadRegister16FromWord,
  loadRegister16AddressFromA,
  loadAddressFromSp,
  popToRegister16,
  pushFromRegister16,
  loadSpFromHl,
} from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x01,
    mnemonic: 'LD BC, {}',
    operationInfo: loadRegister16FromWord(Register16.BC),
  },
  {
    opcode: 0x11,
    mnemonic: 'LD DE, {}',
    operationInfo: loadRegister16FromWord(Register16.DE),
  },
  {
    opcode: 0x21,
    mnemonic: 'LD HL, {}',
    operationInfo: loadRegister16FromWord(Register16.HL),
  },
  {
    opcode: 0x31,
    mnemonic: 'LD SP, {}',
    operationInfo: loadRegister16FromWord(Register16.SP),
  },
  {
    opcode: 0x02,
    mnemonic: 'LD (BC), A',
    operationInfo: loadRegister16AddressFromA(Register16.BC),
  },
  {
    opcode: 0x12,
    mnemonic: 'LD (DE), A',
    operationInfo: loadRegister16AddressFromA(Register16.DE),
  },
  {
    opcode: 0x08,
    mnemonic: 'LD ({}), SP',
    operationInfo: loadAddressFromSp,
  },
  {
    opcode: 0xc1,
    mnemonic: 'POP BC',
    operationInfo: popToRegister16(Register16.BC),
  },
  {
    opcode: 0xd1,
    mnemonic: 'POP DE',
    operationInfo: popToRegister16(Register16.DE),
  },
  {
    opcode: 0xe1,
    mnemonic: 'POP HL',
    operationInfo: popToRegister16(Register16.HL),
  },
  {
    opcode: 0xf1,
    mnemonic: 'POP AF',
    operationInfo: popToRegister16(Register16.AF),
  },
  {
    opcode: 0xc5,
    mnemonic: 'PUSH BC',
    operationInfo: pushFromRegister16(Register16.BC),
  },
  {
    opcode: 0xd5,
    mnemonic: 'PUSH DE',
    operationInfo: pushFromRegister16(Register16.DE),
  },
  {
    opcode: 0xe5,
    mnemonic: 'PUSH HL',
    operationInfo: pushFromRegister16(Register16.HL),
  },
  {
    opcode: 0xf5,
    mnemonic: 'PUSH AF',
    operationInfo: pushFromRegister16(Register16.AF),
  },
  {
    opcode: 0xf9,
    mnemonic: 'LD SP, HL',
    operationInfo: loadSpFromHl,
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
