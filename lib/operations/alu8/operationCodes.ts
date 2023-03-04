import { Register8 } from '../../registers';
import { buildOperationCodeMap, OperationCode } from '../operation';
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
} from './operationInfos';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x04,
    operationInfo: incrementRegister8(Register8.B),
  },
  {
    opcode: 0x14,
    operationInfo: incrementRegister8(Register8.D),
  },
  {
    opcode: 0x24,
    operationInfo: incrementRegister8(Register8.H),
  },
  {
    opcode: 0x34,
    operationInfo: incrementHlAddress,
  },
  {
    opcode: 0x0c,
    operationInfo: incrementRegister8(Register8.C),
  },
  {
    opcode: 0x1c,
    operationInfo: incrementRegister8(Register8.E),
  },
  {
    opcode: 0x2c,
    operationInfo: incrementRegister8(Register8.L),
  },
  {
    opcode: 0x3c,
    operationInfo: incrementRegister8(Register8.A),
  },
  {
    opcode: 0x05,
    operationInfo: decrementRegister8(Register8.B),
  },
  {
    opcode: 0x15,
    operationInfo: decrementRegister8(Register8.D),
  },
  {
    opcode: 0x25,
    operationInfo: decrementRegister8(Register8.H),
  },
  {
    opcode: 0x35,
    operationInfo: decrementHlAddress,
  },
  {
    opcode: 0x0d,
    operationInfo: decrementRegister8(Register8.C),
  },
  {
    opcode: 0x1d,
    operationInfo: decrementRegister8(Register8.E),
  },
  {
    opcode: 0x2d,
    operationInfo: decrementRegister8(Register8.L),
  },
  {
    opcode: 0x3d,
    operationInfo: decrementRegister8(Register8.A),
  },
  {
    opcode: 0x27,
    operationInfo: decimalAdjustA,
  },
  {
    opcode: 0x2f,
    operationInfo: complementA,
  },
  {
    opcode: 0x37,
    operationInfo: setCarryFlag,
  },
  {
    opcode: 0x3f,
    operationInfo: complementCarryFlag,
  },
  {
    opcode: 0x80,
    operationInfo: addRegister8ToA(Register8.B),
  },
  {
    opcode: 0x81,
    operationInfo: addRegister8ToA(Register8.C),
  },
  {
    opcode: 0x82,
    operationInfo: addRegister8ToA(Register8.D),
  },
  {
    opcode: 0x83,
    operationInfo: addRegister8ToA(Register8.E),
  },
  {
    opcode: 0x84,
    operationInfo: addRegister8ToA(Register8.L),
  },
  {
    opcode: 0x85,
    operationInfo: addRegister8ToA(Register8.B),
  },
  {
    opcode: 0x86,
    operationInfo: addHlAddressToA(),
  },
  {
    opcode: 0x87,
    operationInfo: addRegister8ToA(Register8.A),
  },
  {
    opcode: 0x88,
    operationInfo: addRegister8ToA(Register8.B, true),
  },
  {
    opcode: 0x89,
    operationInfo: addRegister8ToA(Register8.C, true),
  },
  {
    opcode: 0x8a,
    operationInfo: addRegister8ToA(Register8.D, true),
  },
  {
    opcode: 0x8b,
    operationInfo: addRegister8ToA(Register8.E, true),
  },
  {
    opcode: 0x8c,
    operationInfo: addRegister8ToA(Register8.L, true),
  },
  {
    opcode: 0x8d,
    operationInfo: addRegister8ToA(Register8.B, true),
  },
  {
    opcode: 0x8e,
    operationInfo: addHlAddressToA(true),
  },
  {
    opcode: 0x8f,
    operationInfo: addRegister8ToA(Register8.A, true),
  },
  {
    opcode: 0x90,
    operationInfo: subtractRegister8FromA(Register8.B),
  },
  {
    opcode: 0x91,
    operationInfo: subtractRegister8FromA(Register8.C),
  },
  {
    opcode: 0x92,
    operationInfo: subtractRegister8FromA(Register8.D),
  },
  {
    opcode: 0x93,
    operationInfo: subtractRegister8FromA(Register8.E),
  },
  {
    opcode: 0x94,
    operationInfo: subtractRegister8FromA(Register8.L),
  },
  {
    opcode: 0x95,
    operationInfo: subtractRegister8FromA(Register8.B),
  },
  {
    opcode: 0x96,
    operationInfo: subtractHlAddressFromA(),
  },
  {
    opcode: 0x97,
    operationInfo: subtractRegister8FromA(Register8.A),
  },
  {
    opcode: 0x98,
    operationInfo: subtractRegister8FromA(Register8.B, true),
  },
  {
    opcode: 0x99,
    operationInfo: subtractRegister8FromA(Register8.C, true),
  },
  {
    opcode: 0x9a,
    operationInfo: subtractRegister8FromA(Register8.D, true),
  },
  {
    opcode: 0x9b,
    operationInfo: subtractRegister8FromA(Register8.E, true),
  },
  {
    opcode: 0x9c,
    operationInfo: subtractRegister8FromA(Register8.L, true),
  },
  {
    opcode: 0x9d,
    operationInfo: subtractRegister8FromA(Register8.B, true),
  },
  {
    opcode: 0x9e,
    operationInfo: subtractHlAddressFromA(true),
  },
  {
    opcode: 0x9f,
    operationInfo: subtractRegister8FromA(Register8.A, true),
  },
  {
    opcode: 0xa0,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa1,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.C,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa2,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.D,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa3,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.E,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa4,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.L,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa5,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa6,
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.And),
  },
  {
    opcode: 0xa7,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.A,
      LogicalOperation.And,
    ),
  },
  {
    opcode: 0xa8,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xa9,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.C,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xaa,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.D,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xab,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.E,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xac,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.L,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xad,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.B,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xae,
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.Xor),
  },
  {
    opcode: 0xaf,
    operationInfo: logicallyApplyRegister8ToA(
      Register8.A,
      LogicalOperation.Xor,
    ),
  },
  {
    opcode: 0xb0,
    operationInfo: logicallyApplyRegister8ToA(Register8.B, LogicalOperation.Or),
  },
  {
    opcode: 0xb1,
    operationInfo: logicallyApplyRegister8ToA(Register8.C, LogicalOperation.Or),
  },
  {
    opcode: 0xb2,
    operationInfo: logicallyApplyRegister8ToA(Register8.D, LogicalOperation.Or),
  },
  {
    opcode: 0xb3,
    operationInfo: logicallyApplyRegister8ToA(Register8.E, LogicalOperation.Or),
  },
  {
    opcode: 0xb4,
    operationInfo: logicallyApplyRegister8ToA(Register8.L, LogicalOperation.Or),
  },
  {
    opcode: 0xb5,
    operationInfo: logicallyApplyRegister8ToA(Register8.B, LogicalOperation.Or),
  },
  {
    opcode: 0xb6,
    operationInfo: logicallyApplyHlAddressWithA(LogicalOperation.Or),
  },
  {
    opcode: 0xb7,
    operationInfo: logicallyApplyRegister8ToA(Register8.A, LogicalOperation.Or),
  },
  {
    opcode: 0xb8,
    operationInfo: subtractRegister8FromA(Register8.B, false, false),
  },
  {
    opcode: 0xb9,
    operationInfo: subtractRegister8FromA(Register8.C, false, false),
  },
  {
    opcode: 0xba,
    operationInfo: subtractRegister8FromA(Register8.D, false, false),
  },
  {
    opcode: 0xbb,
    operationInfo: subtractRegister8FromA(Register8.E, false, false),
  },
  {
    opcode: 0xbc,
    operationInfo: subtractRegister8FromA(Register8.L, false, false),
  },
  {
    opcode: 0xbd,
    operationInfo: subtractRegister8FromA(Register8.B, false, false),
  },
  {
    opcode: 0xbe,
    operationInfo: subtractHlAddressFromA(false, false),
  },
  {
    opcode: 0xbf,
    operationInfo: subtractRegister8FromA(Register8.A, false, false),
  },
  {
    opcode: 0xc6,
    operationInfo: addByteToA(),
  },
  {
    opcode: 0xce,
    operationInfo: addByteToA(true),
  },
  {
    opcode: 0xd6,
    operationInfo: subtractByteFromA(),
  },
  {
    opcode: 0xde,
    operationInfo: subtractByteFromA(true),
  },
  {
    opcode: 0xe6,
    operationInfo: logicallyApplyByteToA(LogicalOperation.And),
  },
  {
    opcode: 0xee,
    operationInfo: logicallyApplyByteToA(LogicalOperation.Xor),
  },
  {
    opcode: 0xf6,
    operationInfo: logicallyApplyByteToA(LogicalOperation.Or),
  },
  {
    opcode: 0xfe,
    operationInfo: subtractByteFromA(false, false),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
