import { Register8 } from '../../registers.js';
import { buildOperationCodeMap, OperationCode } from '../operation.js';
import {
  addByteToA,
  addHlAddressToA,
  addRegister8ToA,
  complementA,
  complementCarryFlag,
  decimalAdjustA,
  decrementHlAddress,
  decrementRegister8,
  incrementHlAddress,
  incrementRegister8,
  logicallyApplyByteToA,
  logicallyApplyHlAddressWithA,
  logicallyApplyRegister8ToA,
  LogicalOperation,
  setCarryFlag,
  subtractByteFromA,
  subtractHlAddressFromA,
  subtractRegister8FromA,
} from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x04,
    mnemonic: 'INC B',
    operationInfo: incrementRegister8(Register8.B),
  },
  {
    opcode: 0x14,
    mnemonic: 'INC D',
    operationInfo: incrementRegister8(Register8.D),
  },
  {
    opcode: 0x24,
    mnemonic: 'INC H',
    operationInfo: incrementRegister8(Register8.H),
  },
  {
    opcode: 0x34,
    mnemonic: 'INC (HL)',
    operationInfo: incrementHlAddress,
  },
  {
    opcode: 0x0c,
    mnemonic: 'INC C',
    operationInfo: incrementRegister8(Register8.C),
  },
  {
    opcode: 0x1c,
    mnemonic: 'INC E',
    operationInfo: incrementRegister8(Register8.E),
  },
  {
    opcode: 0x2c,
    mnemonic: 'INC L',
    operationInfo: incrementRegister8(Register8.L),
  },
  {
    opcode: 0x3c,
    mnemonic: 'INC A',
    operationInfo: incrementRegister8(Register8.A),
  },
  {
    opcode: 0x05,
    mnemonic: 'DEC B',
    operationInfo: decrementRegister8(Register8.B),
  },
  {
    opcode: 0x15,
    mnemonic: 'DEC D',
    operationInfo: decrementRegister8(Register8.D),
  },
  {
    opcode: 0x25,
    mnemonic: 'DEC H',
    operationInfo: decrementRegister8(Register8.H),
  },
  {
    opcode: 0x35,
    mnemonic: 'DEC (HL)',
    operationInfo: decrementHlAddress,
  },
  {
    opcode: 0x0d,
    mnemonic: 'DEC C',
    operationInfo: decrementRegister8(Register8.C),
  },
  {
    opcode: 0x1d,
    mnemonic: 'DEC E',
    operationInfo: decrementRegister8(Register8.E),
  },
  {
    opcode: 0x2d,
    mnemonic: 'DEC L',
    operationInfo: decrementRegister8(Register8.L),
  },
  {
    opcode: 0x3d,
    mnemonic: 'DEC A',
    operationInfo: decrementRegister8(Register8.A),
  },
  {
    opcode: 0x27,
    mnemonic: 'DAA',
    operationInfo: decimalAdjustA,
  },
  {
    opcode: 0x2f,
    mnemonic: 'CPL',
    operationInfo: complementA,
  },
  {
    opcode: 0x37,
    mnemonic: 'SCF',
    operationInfo: setCarryFlag,
  },
  {
    opcode: 0x3f,
    mnemonic: 'CCF',
    operationInfo: complementCarryFlag,
  },
  {
    opcode: 0x80,
    mnemonic: 'ADD A, B',
    operationInfo: addRegister8ToA(Register8.B),
  },
  {
    opcode: 0x81,
    mnemonic: 'ADD A, C',
    operationInfo: addRegister8ToA(Register8.C),
  },
  {
    opcode: 0x82,
    mnemonic: 'ADD A, D',
    operationInfo: addRegister8ToA(Register8.D),
  },
  {
    opcode: 0x83,
    mnemonic: 'ADD A, E',
    operationInfo: addRegister8ToA(Register8.E),
  },
  {
    opcode: 0x84,
    mnemonic: 'ADD A, H',
    operationInfo: addRegister8ToA(Register8.H),
  },
  {
    opcode: 0x85,
    mnemonic: 'ADD A, L',
    operationInfo: addRegister8ToA(Register8.L),
  },
  {
    opcode: 0x86,
    mnemonic: 'ADD A, (HL)',
    operationInfo: addHlAddressToA(),
  },
  {
    opcode: 0x87,
    mnemonic: 'ADD A, A',
    operationInfo: addRegister8ToA(Register8.A),
  },
  {
    opcode: 0x88,
    mnemonic: 'ADC A, B',
    operationInfo: addRegister8ToA(Register8.B, true),
  },
  {
    opcode: 0x89,
    mnemonic: 'ADC A, C',
    operationInfo: addRegister8ToA(Register8.C, true),
  },
  {
    opcode: 0x8a,
    mnemonic: 'ADC A, D',
    operationInfo: addRegister8ToA(Register8.D, true),
  },
  {
    opcode: 0x8b,
    mnemonic: 'ADC A, E',
    operationInfo: addRegister8ToA(Register8.E, true),
  },
  {
    opcode: 0x8c,
    mnemonic: 'ADC A, H',
    operationInfo: addRegister8ToA(Register8.H, true),
  },
  {
    opcode: 0x8d,
    mnemonic: 'ADC A, L',
    operationInfo: addRegister8ToA(Register8.L, true),
  },
  {
    opcode: 0x8e,
    mnemonic: 'ADC A, (HL)',
    operationInfo: addHlAddressToA(true),
  },
  {
    opcode: 0x8f,
    mnemonic: 'ADC A, A',
    operationInfo: addRegister8ToA(Register8.A, true),
  },
  {
    opcode: 0x90,
    mnemonic: 'SUB A, B',
    operationInfo: subtractRegister8FromA(Register8.B),
  },
  {
    opcode: 0x91,
    mnemonic: 'SUB A, C',
    operationInfo: subtractRegister8FromA(Register8.C),
  },
  {
    opcode: 0x92,
    mnemonic: 'SUB A, D',
    operationInfo: subtractRegister8FromA(Register8.D),
  },
  {
    opcode: 0x93,
    mnemonic: 'SUB A, E',
    operationInfo: subtractRegister8FromA(Register8.E),
  },
  {
    opcode: 0x94,
    mnemonic: 'SUB A, H',
    operationInfo: subtractRegister8FromA(Register8.H),
  },
  {
    opcode: 0x95,
    mnemonic: 'SUB A, L',
    operationInfo: subtractRegister8FromA(Register8.L),
  },
  {
    opcode: 0x96,
    mnemonic: 'SUB A, (HL)',
    operationInfo: subtractHlAddressFromA(),
  },
  {
    opcode: 0x97,
    mnemonic: 'SUB A, A',
    operationInfo: subtractRegister8FromA(Register8.A),
  },
  {
    opcode: 0x98,
    mnemonic: 'SBC A, B',
    operationInfo: subtractRegister8FromA(Register8.B, true),
  },
  {
    opcode: 0x99,
    mnemonic: 'SBC A, C',
    operationInfo: subtractRegister8FromA(Register8.C, true),
  },
  {
    opcode: 0x9a,
    mnemonic: 'SBC A, D',
    operationInfo: subtractRegister8FromA(Register8.D, true),
  },
  {
    opcode: 0x9b,
    mnemonic: 'SBC A, E',
    operationInfo: subtractRegister8FromA(Register8.E, true),
  },
  {
    opcode: 0x9c,
    mnemonic: 'SBC A, H',
    operationInfo: subtractRegister8FromA(Register8.H, true),
  },
  {
    opcode: 0x9d,
    mnemonic: 'SBC A, L',
    operationInfo: subtractRegister8FromA(Register8.L, true),
  },
  {
    opcode: 0x9e,
    mnemonic: 'SBC A, (HL)',
    operationInfo: subtractHlAddressFromA(true),
  },
  {
    opcode: 0x9f,
    mnemonic: 'SBC A, A',
    operationInfo: subtractRegister8FromA(Register8.A, true),
  },
  {
    opcode: 0xa0,
    mnemonic: 'AND A, B',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa1,
    mnemonic: 'AND A, C',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.C,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa2,
    mnemonic: 'AND A, D',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.D,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa3,
    mnemonic: 'AND A, E',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.E,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa4,
    mnemonic: 'AND A, H',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.H,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa5,
    mnemonic: 'AND A, L',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.L,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa6,
    mnemonic: 'AND A, (HL)',
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.And),
  },
  {
    opcode: 0xa7,
    mnemonic: 'AND A, A',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.A,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa8,
    mnemonic: 'XOR A, B',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xa9,
    mnemonic: 'XOR A, C',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.C,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xaa,
    mnemonic: 'XOR A, D',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.D,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xab,
    mnemonic: 'XOR A, E',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.E,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xac,
    mnemonic: 'XOR A, H',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.H,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xad,
    mnemonic: 'XOR A, L',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.L,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xae,
    mnemonic: 'XOR A, (HL)',
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.Xor),
  },
  {
    opcode: 0xaf,
    mnemonic: 'XOR A, A',
    operationInfo: logicallyApplyRegister8ToA(
      Register8.A,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xb0,
    mnemonic: 'OR A, B',
    operationInfo: logicallyApplyRegister8ToA(Register8.B, LogicalOperation.Or),
  },
  {
    opcode: 0xb1,
    mnemonic: 'OR A, C',
    operationInfo: logicallyApplyRegister8ToA(Register8.C, LogicalOperation.Or),
  },
  {
    opcode: 0xb2,
    mnemonic: 'OR A, D',
    operationInfo: logicallyApplyRegister8ToA(Register8.D, LogicalOperation.Or),
  },
  {
    opcode: 0xb3,
    mnemonic: 'OR A, E',
    operationInfo: logicallyApplyRegister8ToA(Register8.E, LogicalOperation.Or),
  },
  {
    opcode: 0xb4,
    mnemonic: 'OR A, H',
    operationInfo: logicallyApplyRegister8ToA(Register8.H, LogicalOperation.Or),
  },
  {
    opcode: 0xb5,
    mnemonic: 'OR A, L',
    operationInfo: logicallyApplyRegister8ToA(Register8.L, LogicalOperation.Or),
  },
  {
    opcode: 0xb6,
    mnemonic: 'OR A, (HL)',
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.Or),
  },
  {
    opcode: 0xb7,
    mnemonic: 'OR A, A',
    operationInfo: logicallyApplyRegister8ToA(Register8.A, LogicalOperation.Or),
  },
  {
    opcode: 0xb8,
    mnemonic: 'CP A, B',
    operationInfo: subtractRegister8FromA(Register8.B, false, false),
  },
  {
    opcode: 0xb9,
    mnemonic: 'CP A, C',
    operationInfo: subtractRegister8FromA(Register8.C, false, false),
  },
  {
    opcode: 0xba,
    mnemonic: 'CP A, D',
    operationInfo: subtractRegister8FromA(Register8.D, false, false),
  },
  {
    opcode: 0xbb,
    mnemonic: 'CP A, E',
    operationInfo: subtractRegister8FromA(Register8.E, false, false),
  },
  {
    opcode: 0xbc,
    mnemonic: 'CP A, H',
    operationInfo: subtractRegister8FromA(Register8.H, false, false),
  },
  {
    opcode: 0xbd,
    mnemonic: 'CP A, L',
    operationInfo: subtractRegister8FromA(Register8.L, false, false),
  },
  {
    opcode: 0xbe,
    mnemonic: 'CP A, (HL)',
    operationInfo: subtractHlAddressFromA(false, false),
  },
  {
    opcode: 0xbf,
    mnemonic: 'CP A, A',
    operationInfo: subtractRegister8FromA(Register8.A, false, false),
  },
  {
    opcode: 0xc6,
    mnemonic: 'ADD A, {}',
    operationInfo: addByteToA(),
  },
  {
    opcode: 0xce,
    mnemonic: 'ADC A, {}',
    operationInfo: addByteToA(true),
  },
  {
    opcode: 0xd6,
    mnemonic: 'SUB A, {}',
    operationInfo: subtractByteFromA(),
  },
  {
    opcode: 0xde,
    mnemonic: 'SBC A, {}',
    operationInfo: subtractByteFromA(true),
  },
  {
    opcode: 0xe6,
    mnemonic: 'AND A, {}',
    operationInfo: logicallyApplyByteToA(LogicalOperation.And),
  },
  {
    opcode: 0xee,
    mnemonic: 'XOR A, {}',
    operationInfo: logicallyApplyByteToA(LogicalOperation.Xor),
  },
  {
    opcode: 0xf6,
    mnemonic: 'OR A, {}',
    operationInfo: logicallyApplyByteToA(LogicalOperation.Or),
  },
  {
    opcode: 0xfe,
    mnemonic: 'CP A, {}',
    operationInfo: subtractByteFromA(false, false),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
