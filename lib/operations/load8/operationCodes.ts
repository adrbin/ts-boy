import { Register16, Register8 } from '../../registers.js';
import { buildOperationCodeMap, OperationCode } from '../operation.js';
import {
  loadHlAddressWithIncrementFromA,
  loadHlAddressWithDecrementFromA,
  loadRegister8FromByte,
  loadHlAddressFromByte,
  loadAFromRegisterAddress,
  loadAFromHlAddressWithIncrement,
  loadAFromHlAddressWithDecrement,
  loadRegister8FromRegister8,
  loadRegister8FromHlAddress,
  loadHlAddressFromRegister8,
  loadIoAddressWithByteOffsetFromRegisterA,
  loadRegisterAFromIoAddressWithByteOffset,
  loadIoAddressWithCOffsetFromA,
  loadAFromIoAddressWithCOffset,
  loadAddressFromA,
  loadAFromAddress,
} from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x22,
    operationInfo: loadHlAddressWithIncrementFromA,
  },
  {
    opcode: 0x32,
    operationInfo: loadHlAddressWithDecrementFromA,
  },
  {
    opcode: 0x06,
    operationInfo: loadRegister8FromByte(Register8.B),
  },
  {
    opcode: 0x16,
    operationInfo: loadRegister8FromByte(Register8.D),
  },
  {
    opcode: 0x26,
    operationInfo: loadRegister8FromByte(Register8.H),
  },
  {
    opcode: 0x36,
    operationInfo: loadHlAddressFromByte,
  },
  {
    opcode: 0x0a,
    operationInfo: loadAFromRegisterAddress(Register16.BC),
  },
  {
    opcode: 0x1a,
    operationInfo: loadAFromRegisterAddress(Register16.DE),
  },
  {
    opcode: 0x2a,
    operationInfo: loadAFromHlAddressWithIncrement,
  },
  {
    opcode: 0x3a,
    operationInfo: loadAFromHlAddressWithDecrement,
  },
  {
    opcode: 0x0e,
    operationInfo: loadRegister8FromByte(Register8.C),
  },
  {
    opcode: 0x1e,
    operationInfo: loadRegister8FromByte(Register8.E),
  },
  {
    opcode: 0x2e,
    operationInfo: loadRegister8FromByte(Register8.L),
  },
  {
    opcode: 0x3e,
    operationInfo: loadRegister8FromByte(Register8.A),
  },
  {
    opcode: 0x40,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.B),
  },
  {
    opcode: 0x41,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.C),
  },
  {
    opcode: 0x42,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.D),
  },
  {
    opcode: 0x43,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.E),
  },
  {
    opcode: 0x44,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.H),
  },
  {
    opcode: 0x45,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.L),
  },
  {
    opcode: 0x46,
    operationInfo: loadRegister8FromHlAddress(Register8.B),
  },
  {
    opcode: 0x47,
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.A),
  },
  {
    opcode: 0x48,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.B),
  },
  {
    opcode: 0x49,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.C),
  },
  {
    opcode: 0x4a,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.D),
  },
  {
    opcode: 0x4b,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.E),
  },
  {
    opcode: 0x4c,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.H),
  },
  {
    opcode: 0x4d,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.L),
  },
  {
    opcode: 0x4e,
    operationInfo: loadRegister8FromHlAddress(Register8.C),
  },
  {
    opcode: 0x4f,
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.A),
  },
  {
    opcode: 0x50,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.B),
  },
  {
    opcode: 0x51,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.C),
  },
  {
    opcode: 0x52,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.D),
  },
  {
    opcode: 0x53,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.E),
  },
  {
    opcode: 0x54,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.H),
  },
  {
    opcode: 0x55,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.L),
  },
  {
    opcode: 0x56,
    operationInfo: loadRegister8FromHlAddress(Register8.D),
  },
  {
    opcode: 0x57,
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.A),
  },
  {
    opcode: 0x58,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.B),
  },
  {
    opcode: 0x59,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.C),
  },
  {
    opcode: 0x5a,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.D),
  },
  {
    opcode: 0x5b,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.E),
  },
  {
    opcode: 0x5c,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.H),
  },
  {
    opcode: 0x5d,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.L),
  },
  {
    opcode: 0x5e,
    operationInfo: loadRegister8FromHlAddress(Register8.E),
  },
  {
    opcode: 0x5f,
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.A),
  },
  {
    opcode: 0x60,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.B),
  },
  {
    opcode: 0x61,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.C),
  },
  {
    opcode: 0x62,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.D),
  },
  {
    opcode: 0x63,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.E),
  },
  {
    opcode: 0x64,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.H),
  },
  {
    opcode: 0x65,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.L),
  },
  {
    opcode: 0x66,
    operationInfo: loadRegister8FromHlAddress(Register8.H),
  },
  {
    opcode: 0x67,
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.A),
  },
  {
    opcode: 0x68,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.B),
  },
  {
    opcode: 0x69,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.C),
  },
  {
    opcode: 0x6a,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.D),
  },
  {
    opcode: 0x6b,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.E),
  },
  {
    opcode: 0x6c,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.H),
  },
  {
    opcode: 0x6d,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.L),
  },
  {
    opcode: 0x6e,
    operationInfo: loadRegister8FromHlAddress(Register8.L),
  },
  {
    opcode: 0x6f,
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.A),
  },
  {
    opcode: 0x70,
    operationInfo: loadHlAddressFromRegister8(Register8.B),
  },
  {
    opcode: 0x71,
    operationInfo: loadHlAddressFromRegister8(Register8.C),
  },
  {
    opcode: 0x72,
    operationInfo: loadHlAddressFromRegister8(Register8.D),
  },
  {
    opcode: 0x73,
    operationInfo: loadHlAddressFromRegister8(Register8.E),
  },
  {
    opcode: 0x74,
    operationInfo: loadHlAddressFromRegister8(Register8.H),
  },
  {
    opcode: 0x75,
    operationInfo: loadHlAddressFromRegister8(Register8.L),
  },
  {
    opcode: 0x77,
    operationInfo: loadHlAddressFromRegister8(Register8.A),
  },
  {
    opcode: 0x78,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.B),
  },
  {
    opcode: 0x79,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.C),
  },
  {
    opcode: 0x7a,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.D),
  },
  {
    opcode: 0x7b,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.E),
  },
  {
    opcode: 0x7c,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.H),
  },
  {
    opcode: 0x7d,
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.L),
  },
  {
    opcode: 0x7e,
    operationInfo: loadRegister8FromHlAddress(Register8.A),
  },
  {
    opcode: 0xe0,
    operationInfo: loadIoAddressWithByteOffsetFromRegisterA,
  },
  {
    opcode: 0xf0,
    operationInfo: loadRegisterAFromIoAddressWithByteOffset,
  },
  {
    opcode: 0xe2,
    operationInfo: loadIoAddressWithCOffsetFromA,
  },
  {
    opcode: 0xf2,
    operationInfo: loadAFromIoAddressWithCOffset,
  },
  {
    opcode: 0xea,
    operationInfo: loadAddressFromA,
  },
  {
    opcode: 0xfa,
    operationInfo: loadAFromAddress,
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
