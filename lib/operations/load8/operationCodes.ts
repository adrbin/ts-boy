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
    mnemonic: 'LD (HL+), A',
    operationInfo: loadHlAddressWithIncrementFromA,
  },
  {
    opcode: 0x32,
    mnemonic: 'LD (HL-), A',
    operationInfo: loadHlAddressWithDecrementFromA,
  },
  {
    opcode: 0x06,
    mnemonic: 'LD B, {}',
    operationInfo: loadRegister8FromByte(Register8.B),
  },
  {
    opcode: 0x16,
    mnemonic: 'LD D, {}',
    operationInfo: loadRegister8FromByte(Register8.D),
  },
  {
    opcode: 0x26,
    mnemonic: 'LD H, {}',
    operationInfo: loadRegister8FromByte(Register8.H),
  },
  {
    opcode: 0x36,
    mnemonic: 'LD (HL), {}',
    operationInfo: loadHlAddressFromByte,
  },
  {
    opcode: 0x0a,
    mnemonic: 'LD A, (BC)',
    operationInfo: loadAFromRegisterAddress(Register16.BC),
  },
  {
    opcode: 0x1a,
    mnemonic: 'LD A, (DE)',
    operationInfo: loadAFromRegisterAddress(Register16.DE),
  },
  {
    opcode: 0x2a,
    mnemonic: 'LD A, (HL+)',
    operationInfo: loadAFromHlAddressWithIncrement,
  },
  {
    opcode: 0x3a,
    mnemonic: 'LD A, (HL-)',
    operationInfo: loadAFromHlAddressWithDecrement,
  },
  {
    opcode: 0x0e,
    mnemonic: 'LD C, {}',
    operationInfo: loadRegister8FromByte(Register8.C),
  },
  {
    opcode: 0x1e,
    mnemonic: 'LD E, {}',
    operationInfo: loadRegister8FromByte(Register8.E),
  },
  {
    opcode: 0x2e,
    mnemonic: 'LD L, {}',
    operationInfo: loadRegister8FromByte(Register8.L),
  },
  {
    opcode: 0x3e,
    mnemonic: 'LD A, {}',
    operationInfo: loadRegister8FromByte(Register8.A),
  },
  {
    opcode: 0x40,
    mnemonic: 'LD B, B',
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.B),
  },
  {
    opcode: 0x41,
    mnemonic: 'LD B, C',
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.C),
  },
  {
    opcode: 0x42,
    mnemonic: 'LD B, D',
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.D),
  },
  {
    opcode: 0x43,
    mnemonic: 'LD B, E',
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.E),
  },
  {
    opcode: 0x44,
    mnemonic: 'LD B, H',
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.H),
  },
  {
    opcode: 0x45,
    mnemonic: 'LD B, L',
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.L),
  },
  {
    opcode: 0x46,
    mnemonic: 'LD B, (HL)',
    operationInfo: loadRegister8FromHlAddress(Register8.B),
  },
  {
    opcode: 0x47,
    mnemonic: 'LD B, A',
    operationInfo: loadRegister8FromRegister8(Register8.B, Register8.A),
  },
  {
    opcode: 0x48,
    mnemonic: 'LD C, B',
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.B),
  },
  {
    opcode: 0x49,
    mnemonic: 'LD C, C',
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.C),
  },
  {
    opcode: 0x4a,
    mnemonic: 'LD C, D',
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.D),
  },
  {
    opcode: 0x4b,
    mnemonic: 'LD C, E',
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.E),
  },
  {
    opcode: 0x4c,
    mnemonic: 'LD C, H',
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.H),
  },
  {
    opcode: 0x4d,
    mnemonic: 'LD C, L',
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.L),
  },
  {
    opcode: 0x4e,
    mnemonic: 'LD C, (HL)',
    operationInfo: loadRegister8FromHlAddress(Register8.C),
  },
  {
    opcode: 0x4f,
    mnemonic: 'LD C, A',
    operationInfo: loadRegister8FromRegister8(Register8.C, Register8.A),
  },
  {
    opcode: 0x50,
    mnemonic: 'LD D, B',
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.B),
  },
  {
    opcode: 0x51,
    mnemonic: 'LD D, C',
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.C),
  },
  {
    opcode: 0x52,
    mnemonic: 'LD D, D',
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.D),
  },
  {
    opcode: 0x53,
    mnemonic: 'LD D, E',
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.E),
  },
  {
    opcode: 0x54,
    mnemonic: 'LD D, H',
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.H),
  },
  {
    opcode: 0x55,
    mnemonic: 'LD D, L',
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.L),
  },
  {
    opcode: 0x56,
    mnemonic: 'LD D, (HL)',
    operationInfo: loadRegister8FromHlAddress(Register8.D),
  },
  {
    opcode: 0x57,
    mnemonic: 'LD D, A',
    operationInfo: loadRegister8FromRegister8(Register8.D, Register8.A),
  },
  {
    opcode: 0x58,
    mnemonic: 'LD E, B',
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.B),
  },
  {
    opcode: 0x59,
    mnemonic: 'LD E, C',
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.C),
  },
  {
    opcode: 0x5a,
    mnemonic: 'LD E, D',
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.D),
  },
  {
    opcode: 0x5b,
    mnemonic: 'LD E, E',
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.E),
  },
  {
    opcode: 0x5c,
    mnemonic: 'LD E, H',
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.H),
  },
  {
    opcode: 0x5d,
    mnemonic: 'LD E, L',
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.L),
  },
  {
    opcode: 0x5e,
    mnemonic: 'LD E, (HL)',
    operationInfo: loadRegister8FromHlAddress(Register8.E),
  },
  {
    opcode: 0x5f,
    mnemonic: 'LD E, A',
    operationInfo: loadRegister8FromRegister8(Register8.E, Register8.A),
  },
  {
    opcode: 0x60,
    mnemonic: 'LD H, B',
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.B),
  },
  {
    opcode: 0x61,
    mnemonic: 'LD H, C',
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.C),
  },
  {
    opcode: 0x62,
    mnemonic: 'LD H, D',
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.D),
  },
  {
    opcode: 0x63,
    mnemonic: 'LD H, E',
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.E),
  },
  {
    opcode: 0x64,
    mnemonic: 'LD H, H',
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.H),
  },
  {
    opcode: 0x65,
    mnemonic: 'LD H, L',
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.L),
  },
  {
    opcode: 0x66,
    mnemonic: 'LD H, (HL)',
    operationInfo: loadRegister8FromHlAddress(Register8.H),
  },
  {
    opcode: 0x67,
    mnemonic: 'LD H, A',
    operationInfo: loadRegister8FromRegister8(Register8.H, Register8.A),
  },
  {
    opcode: 0x68,
    mnemonic: 'LD L, B',
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.B),
  },
  {
    opcode: 0x69,
    mnemonic: 'LD L, C',
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.C),
  },
  {
    opcode: 0x6a,
    mnemonic: 'LD L, D',
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.D),
  },
  {
    opcode: 0x6b,
    mnemonic: 'LD L, E',
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.E),
  },
  {
    opcode: 0x6c,
    mnemonic: 'LD L, H',
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.H),
  },
  {
    opcode: 0x6d,
    mnemonic: 'LD L, L',
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.L),
  },
  {
    opcode: 0x6e,
    mnemonic: 'LD L, (HL)',
    operationInfo: loadRegister8FromHlAddress(Register8.L),
  },
  {
    opcode: 0x6f,
    mnemonic: 'LD L, A',
    operationInfo: loadRegister8FromRegister8(Register8.L, Register8.A),
  },
  {
    opcode: 0x70,
    mnemonic: 'LD (HL), B',
    operationInfo: loadHlAddressFromRegister8(Register8.B),
  },
  {
    opcode: 0x71,
    mnemonic: 'LD (HL), C',
    operationInfo: loadHlAddressFromRegister8(Register8.C),
  },
  {
    opcode: 0x72,
    mnemonic: 'LD (HL), D',
    operationInfo: loadHlAddressFromRegister8(Register8.D),
  },
  {
    opcode: 0x73,
    mnemonic: 'LD (HL), E',
    operationInfo: loadHlAddressFromRegister8(Register8.E),
  },
  {
    opcode: 0x74,
    mnemonic: 'LD (HL), H',
    operationInfo: loadHlAddressFromRegister8(Register8.H),
  },
  {
    opcode: 0x75,
    mnemonic: 'LD (HL), L',
    operationInfo: loadHlAddressFromRegister8(Register8.L),
  },
  {
    opcode: 0x77,
    mnemonic: 'LD (HL), A',
    operationInfo: loadHlAddressFromRegister8(Register8.A),
  },
  {
    opcode: 0x78,
    mnemonic: 'LD A, B',
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.B),
  },
  {
    opcode: 0x79,
    mnemonic: 'LD A, C',
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.C),
  },
  {
    opcode: 0x7a,
    mnemonic: 'LD A, D',
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.D),
  },
  {
    opcode: 0x7b,
    mnemonic: 'LD A, E',
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.E),
  },
  {
    opcode: 0x7c,
    mnemonic: 'LD A, H',
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.H),
  },
  {
    opcode: 0x7d,
    mnemonic: 'LD A, L',
    operationInfo: loadRegister8FromRegister8(Register8.A, Register8.L),
  },
  {
    opcode: 0x7e,
    mnemonic: 'LD A, (HL)',
    operationInfo: loadRegister8FromHlAddress(Register8.A),
  },
  {
    opcode: 0xe0,
    mnemonic: 'LDH ({}), A',
    operationInfo: loadIoAddressWithByteOffsetFromRegisterA,
  },
  {
    opcode: 0xf0,
    mnemonic: 'LDH {}, A',
    operationInfo: loadRegisterAFromIoAddressWithByteOffset,
  },
  {
    opcode: 0xe2,
    mnemonic: 'LD (C), A',
    operationInfo: loadIoAddressWithCOffsetFromA,
  },
  {
    opcode: 0xf2,
    mnemonic: 'LD A, (C)',
    operationInfo: loadAFromIoAddressWithCOffset,
  },
  {
    opcode: 0xea,
    mnemonic: 'LD ({}), A',
    operationInfo: loadAddressFromA,
  },
  {
    opcode: 0xfa,
    mnemonic: 'LD A, ({})',
    operationInfo: loadAFromAddress,
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
