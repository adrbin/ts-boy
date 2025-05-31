import { Register8 } from '../../registers.js';
import { buildOperationCodeMap, OperationCode } from '../operation.js';
import {
  shiftLeftRegister8,
  ShiftMode,
  shiftLeftHlAddress,
  shiftRightRegister8,
  shiftRightHlAddress,
  swapRegister8,
  swapHlAddress,
  testBitOfRegister8,
  testBitOfHlAddress,
  setBitOfRegister8,
  setBitOfHlAddress,
} from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x00,
    mnemonic: 'RLC B',
    operationInfo: shiftLeftRegister8(Register8.B, ShiftMode.Rotate),
  },
  {
    opcode: 0x01,
    mnemonic: 'RLC C',
    operationInfo: shiftLeftRegister8(Register8.C, ShiftMode.Rotate),
  },
  {
    opcode: 0x02,
    mnemonic: 'RLC D',
    operationInfo: shiftLeftRegister8(Register8.D, ShiftMode.Rotate),
  },
  {
    opcode: 0x03,
    mnemonic: 'RLC E',
    operationInfo: shiftLeftRegister8(Register8.E, ShiftMode.Rotate),
  },
  {
    opcode: 0x04,
    mnemonic: 'RLC H',
    operationInfo: shiftLeftRegister8(Register8.H, ShiftMode.Rotate),
  },
  {
    opcode: 0x05,
    mnemonic: 'RLC L',
    operationInfo: shiftLeftRegister8(Register8.L, ShiftMode.Rotate),
  },
  {
    opcode: 0x06,
    mnemonic: 'RLC (HL)',
    operationInfo: shiftLeftHlAddress(ShiftMode.Rotate),
  },
  {
    opcode: 0x07,
    mnemonic: 'RLC A',
    operationInfo: shiftLeftRegister8(Register8.A, ShiftMode.Rotate),
  },
  {
    opcode: 0x08,
    mnemonic: 'RRC B',
    operationInfo: shiftRightRegister8(Register8.B, ShiftMode.Rotate),
  },
  {
    opcode: 0x09,
    mnemonic: 'RRC C',
    operationInfo: shiftRightRegister8(Register8.C, ShiftMode.Rotate),
  },
  {
    opcode: 0x0a,
    mnemonic: 'RRC D',
    operationInfo: shiftRightRegister8(Register8.D, ShiftMode.Rotate),
  },
  {
    opcode: 0x0b,
    mnemonic: 'RRC E',
    operationInfo: shiftRightRegister8(Register8.E, ShiftMode.Rotate),
  },
  {
    opcode: 0x0c,
    mnemonic: 'RRC H',
    operationInfo: shiftRightRegister8(Register8.H, ShiftMode.Rotate),
  },
  {
    opcode: 0x0d,
    mnemonic: 'RRC L',
    operationInfo: shiftRightRegister8(Register8.L, ShiftMode.Rotate),
  },
  {
    opcode: 0x0e,
    mnemonic: 'RRC (HL)',
    operationInfo: shiftRightHlAddress(ShiftMode.Rotate),
  },
  {
    opcode: 0x0f,
    mnemonic: 'RRC A',
    operationInfo: shiftRightRegister8(Register8.A, ShiftMode.Rotate),
  },
  {
    opcode: 0x10,
    mnemonic: 'RL B',
    operationInfo: shiftLeftRegister8(
      Register8.B,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x11,
    mnemonic: 'RL C',
    operationInfo: shiftLeftRegister8(
      Register8.C,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x12,
    mnemonic: 'RL D',
    operationInfo: shiftLeftRegister8(
      Register8.D,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x13,
    mnemonic: 'RL E',
    operationInfo: shiftLeftRegister8(
      Register8.E,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x14,
    mnemonic: 'RL H',
    operationInfo: shiftLeftRegister8(
      Register8.H,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x15,
    mnemonic: 'RL L',
    operationInfo: shiftLeftRegister8(
      Register8.L,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x16,
    mnemonic: 'RL (HL)',
    operationInfo: shiftLeftHlAddress(ShiftMode.RotateThroughCarry),
  },
  {
    opcode: 0x17,
    mnemonic: 'RL A',
    operationInfo: shiftLeftRegister8(
      Register8.A,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x18,
    mnemonic: 'RR B',
    operationInfo: shiftRightRegister8(
      Register8.B,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x19,
    mnemonic: 'RR C',
    operationInfo: shiftRightRegister8(
      Register8.C,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1a,
    mnemonic: 'RR D',
    operationInfo: shiftRightRegister8(
      Register8.D,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1b,
    mnemonic: 'RR E',
    operationInfo: shiftRightRegister8(
      Register8.E,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1c,
    mnemonic: 'RR H',
    operationInfo: shiftRightRegister8(
      Register8.H,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1d,
    mnemonic: 'RR L',
    operationInfo: shiftRightRegister8(
      Register8.L,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1e,
    mnemonic: 'RR (HL)',
    operationInfo: shiftRightHlAddress(ShiftMode.RotateThroughCarry),
  },
  {
    opcode: 0x1f,
    mnemonic: 'RR A',
    operationInfo: shiftRightRegister8(
      Register8.A,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x20,
    mnemonic: 'SLA B',
    operationInfo: shiftLeftRegister8(Register8.B, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x21,
    mnemonic: 'SLA C',
    operationInfo: shiftLeftRegister8(Register8.C, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x22,
    mnemonic: 'SLA D',
    operationInfo: shiftLeftRegister8(Register8.D, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x23,
    mnemonic: 'SLA E',
    operationInfo: shiftLeftRegister8(Register8.E, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x24,
    mnemonic: 'SLA H',
    operationInfo: shiftLeftRegister8(Register8.H, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x25,
    mnemonic: 'SLA L',
    operationInfo: shiftLeftRegister8(Register8.L, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x26,
    mnemonic: 'SLA (HL)',
    operationInfo: shiftLeftHlAddress(ShiftMode.Arithmetic),
  },
  {
    opcode: 0x27,
    mnemonic: 'SLA A',
    operationInfo: shiftLeftRegister8(Register8.A, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x28,
    mnemonic: 'SRA B',
    operationInfo: shiftRightRegister8(Register8.B, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x29,
    mnemonic: 'SRA C',
    operationInfo: shiftRightRegister8(Register8.C, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2a,
    mnemonic: 'SRA D',
    operationInfo: shiftRightRegister8(Register8.D, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2b,
    mnemonic: 'SRA E',
    operationInfo: shiftRightRegister8(Register8.E, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2c,
    mnemonic: 'SRA H',
    operationInfo: shiftRightRegister8(Register8.H, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2d,
    mnemonic: 'SRA L',
    operationInfo: shiftRightRegister8(Register8.L, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2e,
    mnemonic: 'SRA (HL)',
    operationInfo: shiftRightHlAddress(ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2f,
    mnemonic: 'SRA A',
    operationInfo: shiftRightRegister8(Register8.A, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x30,
    mnemonic: 'SWAP B',
    operationInfo: swapRegister8(Register8.B),
  },
  {
    opcode: 0x31,
    mnemonic: 'SWAP C',
    operationInfo: swapRegister8(Register8.C),
  },
  {
    opcode: 0x32,
    mnemonic: 'SWAP D',
    operationInfo: swapRegister8(Register8.D),
  },
  {
    opcode: 0x33,
    mnemonic: 'SWAP E',
    operationInfo: swapRegister8(Register8.E),
  },
  {
    opcode: 0x34,
    mnemonic: 'SWAP H',
    operationInfo: swapRegister8(Register8.H),
  },
  {
    opcode: 0x35,
    mnemonic: 'SWAP L',
    operationInfo: swapRegister8(Register8.L),
  },
  {
    opcode: 0x36,
    mnemonic: 'SWAP (HL)',
    operationInfo: swapHlAddress,
  },
  {
    opcode: 0x37,
    mnemonic: 'SWAP A',
    operationInfo: swapRegister8(Register8.A),
  },
  {
    opcode: 0x38,
    mnemonic: 'SRL B',
    operationInfo: shiftRightRegister8(Register8.B, ShiftMode.Logical),
  },
  {
    opcode: 0x39,
    mnemonic: 'SRL C',
    operationInfo: shiftRightRegister8(Register8.C, ShiftMode.Logical),
  },
  {
    opcode: 0x3a,
    mnemonic: 'SRL D',
    operationInfo: shiftRightRegister8(Register8.D, ShiftMode.Logical),
  },
  {
    opcode: 0x3b,
    mnemonic: 'SRL E',
    operationInfo: shiftRightRegister8(Register8.E, ShiftMode.Logical),
  },
  {
    opcode: 0x3c,
    mnemonic: 'SRL H',
    operationInfo: shiftRightRegister8(Register8.H, ShiftMode.Logical),
  },
  {
    opcode: 0x3d,
    mnemonic: 'SRL L',
    operationInfo: shiftRightRegister8(Register8.L, ShiftMode.Logical),
  },
  {
    opcode: 0x3e,
    mnemonic: 'SRL (HL)',
    operationInfo: shiftRightHlAddress(ShiftMode.Logical),
  },
  {
    opcode: 0x3f,
    mnemonic: 'SRL A',
    operationInfo: shiftRightRegister8(Register8.A, ShiftMode.Logical),
  },
  {
    opcode: 0x40,
    mnemonic: 'BIT 0, B',
    operationInfo: testBitOfRegister8(Register8.B, 0),
  },
  {
    opcode: 0x41,
    mnemonic: 'BIT 0, C',
    operationInfo: testBitOfRegister8(Register8.C, 0),
  },
  {
    opcode: 0x42,
    mnemonic: 'BIT 0, D',
    operationInfo: testBitOfRegister8(Register8.D, 0),
  },
  {
    opcode: 0x43,
    mnemonic: 'BIT 0, E',
    operationInfo: testBitOfRegister8(Register8.E, 0),
  },
  {
    opcode: 0x44,
    mnemonic: 'BIT 0, H',
    operationInfo: testBitOfRegister8(Register8.H, 0),
  },
  {
    opcode: 0x45,
    mnemonic: 'BIT 0, L',
    operationInfo: testBitOfRegister8(Register8.L, 0),
  },
  {
    opcode: 0x46,
    mnemonic: 'BIT 0, (HL)',
    operationInfo: testBitOfHlAddress(0),
  },
  {
    opcode: 0x47,
    mnemonic: 'BIT 0, A',
    operationInfo: testBitOfRegister8(Register8.A, 0),
  },
  {
    opcode: 0x48,
    mnemonic: 'BIT 1, B',
    operationInfo: testBitOfRegister8(Register8.B, 1),
  },
  {
    opcode: 0x49,
    mnemonic: 'BIT 1, C',
    operationInfo: testBitOfRegister8(Register8.C, 1),
  },
  {
    opcode: 0x4a,
    mnemonic: 'BIT 1, D',
    operationInfo: testBitOfRegister8(Register8.D, 1),
  },
  {
    opcode: 0x4b,
    mnemonic: 'BIT 1, E',
    operationInfo: testBitOfRegister8(Register8.E, 1),
  },
  {
    opcode: 0x4c,
    mnemonic: 'BIT 1, H',
    operationInfo: testBitOfRegister8(Register8.H, 1),
  },
  {
    opcode: 0x4d,
    mnemonic: 'BIT 1, L',
    operationInfo: testBitOfRegister8(Register8.L, 1),
  },
  {
    opcode: 0x4e,
    mnemonic: 'BIT 1, (HL)',
    operationInfo: testBitOfHlAddress(1),
  },
  {
    opcode: 0x4f,
    mnemonic: 'BIT 1, A',
    operationInfo: testBitOfRegister8(Register8.A, 1),
  },
  {
    opcode: 0x50,
    mnemonic: 'BIT 2, B',
    operationInfo: testBitOfRegister8(Register8.B, 2),
  },
  {
    opcode: 0x51,
    mnemonic: 'BIT 2, C',
    operationInfo: testBitOfRegister8(Register8.C, 2),
  },
  {
    opcode: 0x52,
    mnemonic: 'BIT 2, D',
    operationInfo: testBitOfRegister8(Register8.D, 2),
  },
  {
    opcode: 0x53,
    mnemonic: 'BIT 2, E',
    operationInfo: testBitOfRegister8(Register8.E, 2),
  },
  {
    opcode: 0x54,
    mnemonic: 'BIT 2, H',
    operationInfo: testBitOfRegister8(Register8.H, 2),
  },
  {
    opcode: 0x55,
    mnemonic: 'BIT 2, L',
    operationInfo: testBitOfRegister8(Register8.L, 2),
  },
  {
    opcode: 0x56,
    mnemonic: 'BIT 2, (HL)',
    operationInfo: testBitOfHlAddress(2),
  },
  {
    opcode: 0x57,
    mnemonic: 'BIT 2, A',
    operationInfo: testBitOfRegister8(Register8.A, 2),
  },
  {
    opcode: 0x58,
    mnemonic: 'BIT 3, B',
    operationInfo: testBitOfRegister8(Register8.B, 3),
  },
  {
    opcode: 0x59,
    mnemonic: 'BIT 3, C',
    operationInfo: testBitOfRegister8(Register8.C, 3),
  },
  {
    opcode: 0x5a,
    mnemonic: 'BIT 3, D',
    operationInfo: testBitOfRegister8(Register8.D, 3),
  },
  {
    opcode: 0x5b,
    mnemonic: 'BIT 3, E',
    operationInfo: testBitOfRegister8(Register8.E, 3),
  },
  {
    opcode: 0x5c,
    mnemonic: 'BIT 3, H',
    operationInfo: testBitOfRegister8(Register8.H, 3),
  },
  {
    opcode: 0x5d,
    mnemonic: 'BIT 3, L',
    operationInfo: testBitOfRegister8(Register8.L, 3),
  },
  {
    opcode: 0x5e,
    mnemonic: 'BIT 3, (HL)',
    operationInfo: testBitOfHlAddress(3),
  },
  {
    opcode: 0x5f,
    mnemonic: 'BIT 3, A',
    operationInfo: testBitOfRegister8(Register8.A, 3),
  },
  {
    opcode: 0x60,
    mnemonic: 'BIT 4, B',
    operationInfo: testBitOfRegister8(Register8.B, 4),
  },
  {
    opcode: 0x61,
    mnemonic: 'BIT 4, C',
    operationInfo: testBitOfRegister8(Register8.C, 4),
  },
  {
    opcode: 0x62,
    mnemonic: 'BIT 4, D',
    operationInfo: testBitOfRegister8(Register8.D, 4),
  },
  {
    opcode: 0x63,
    mnemonic: 'BIT 4, E',
    operationInfo: testBitOfRegister8(Register8.E, 4),
  },
  {
    opcode: 0x64,
    mnemonic: 'BIT 4, H',
    operationInfo: testBitOfRegister8(Register8.H, 4),
  },
  {
    opcode: 0x65,
    mnemonic: 'BIT 4, L',
    operationInfo: testBitOfRegister8(Register8.L, 4),
  },
  {
    opcode: 0x66,
    mnemonic: 'BIT 4, (HL)',
    operationInfo: testBitOfHlAddress(4),
  },
  {
    opcode: 0x67,
    mnemonic: 'BIT 4, A',
    operationInfo: testBitOfRegister8(Register8.A, 4),
  },
  {
    opcode: 0x68,
    mnemonic: 'BIT 5, B',
    operationInfo: testBitOfRegister8(Register8.B, 5),
  },
  {
    opcode: 0x69,
    mnemonic: 'BIT 5, C',
    operationInfo: testBitOfRegister8(Register8.C, 5),
  },
  {
    opcode: 0x6a,
    mnemonic: 'BIT 5, D',
    operationInfo: testBitOfRegister8(Register8.D, 5),
  },
  {
    opcode: 0x6b,
    mnemonic: 'BIT 5, E',
    operationInfo: testBitOfRegister8(Register8.E, 5),
  },
  {
    opcode: 0x6c,
    mnemonic: 'BIT 5, H',
    operationInfo: testBitOfRegister8(Register8.H, 5),
  },
  {
    opcode: 0x6d,
    mnemonic: 'BIT 5, L',
    operationInfo: testBitOfRegister8(Register8.L, 5),
  },
  {
    opcode: 0x6e,
    mnemonic: 'BIT 5, (HL)',
    operationInfo: testBitOfHlAddress(5),
  },
  {
    opcode: 0x6f,
    mnemonic: 'BIT 5, A',
    operationInfo: testBitOfRegister8(Register8.A, 5),
  },
  {
    opcode: 0x70,
    mnemonic: 'BIT 6, B',
    operationInfo: testBitOfRegister8(Register8.B, 6),
  },
  {
    opcode: 0x71,
    mnemonic: 'BIT 6, C',
    operationInfo: testBitOfRegister8(Register8.C, 6),
  },
  {
    opcode: 0x72,
    mnemonic: 'BIT 6, D',
    operationInfo: testBitOfRegister8(Register8.D, 6),
  },
  {
    opcode: 0x73,
    mnemonic: 'BIT 6, E',
    operationInfo: testBitOfRegister8(Register8.E, 6),
  },
  {
    opcode: 0x74,
    mnemonic: 'BIT 6, H',
    operationInfo: testBitOfRegister8(Register8.H, 6),
  },
  {
    opcode: 0x75,
    mnemonic: 'BIT 6, L',
    operationInfo: testBitOfRegister8(Register8.L, 6),
  },
  {
    opcode: 0x76,
    mnemonic: 'BIT 6, (HL)',
    operationInfo: testBitOfHlAddress(6),
  },
  {
    opcode: 0x77,
    mnemonic: 'BIT 6, A',
    operationInfo: testBitOfRegister8(Register8.A, 6),
  },
  {
    opcode: 0x78,
    mnemonic: 'BIT 7, B',
    operationInfo: testBitOfRegister8(Register8.B, 7),
  },
  {
    opcode: 0x79,
    mnemonic: 'BIT 7, C',
    operationInfo: testBitOfRegister8(Register8.C, 7),
  },
  {
    opcode: 0x7a,
    mnemonic: 'BIT 7, D',
    operationInfo: testBitOfRegister8(Register8.D, 7),
  },
  {
    opcode: 0x7b,
    mnemonic: 'BIT 7, E',
    operationInfo: testBitOfRegister8(Register8.E, 7),
  },
  {
    opcode: 0x7c,
    mnemonic: 'BIT 7, H',
    operationInfo: testBitOfRegister8(Register8.H, 7),
  },
  {
    opcode: 0x7d,
    mnemonic: 'BIT 7, L',
    operationInfo: testBitOfRegister8(Register8.L, 7),
  },
  {
    opcode: 0x7e,
    mnemonic: 'BIT 7, (HL)',
    operationInfo: testBitOfHlAddress(7),
  },
  {
    opcode: 0x7f,
    mnemonic: 'BIT 7, A',
    operationInfo: testBitOfRegister8(Register8.A, 7),
  },
  {
    opcode: 0x80,
    mnemonic: 'RES 0, B',
    operationInfo: setBitOfRegister8(Register8.B, 0, false),
  },
  {
    opcode: 0x81,
    mnemonic: 'RES 0, C',
    operationInfo: setBitOfRegister8(Register8.C, 0, false),
  },
  {
    opcode: 0x82,
    mnemonic: 'RES 0, D',
    operationInfo: setBitOfRegister8(Register8.D, 0, false),
  },
  {
    opcode: 0x83,
    mnemonic: 'RES 0, E',
    operationInfo: setBitOfRegister8(Register8.E, 0, false),
  },
  {
    opcode: 0x84,
    mnemonic: 'RES 0, H',
    operationInfo: setBitOfRegister8(Register8.H, 0, false),
  },
  {
    opcode: 0x85,
    mnemonic: 'RES 0, L',
    operationInfo: setBitOfRegister8(Register8.L, 0, false),
  },
  {
    opcode: 0x86,
    mnemonic: 'RES 0, (HL)',
    operationInfo: setBitOfHlAddress(0, false),
  },
  {
    opcode: 0x87,
    mnemonic: 'RES 0, A',
    operationInfo: setBitOfRegister8(Register8.A, 0, false),
  },
  {
    opcode: 0x88,
    mnemonic: 'RES 1, B',
    operationInfo: setBitOfRegister8(Register8.B, 1, false),
  },
  {
    opcode: 0x89,
    mnemonic: 'RES 1, C',
    operationInfo: setBitOfRegister8(Register8.C, 1, false),
  },
  {
    opcode: 0x8a,
    mnemonic: 'RES 1, D',
    operationInfo: setBitOfRegister8(Register8.D, 1, false),
  },
  {
    opcode: 0x8b,
    mnemonic: 'RES 1, E',
    operationInfo: setBitOfRegister8(Register8.E, 1, false),
  },
  {
    opcode: 0x8c,
    mnemonic: 'RES 1, H',
    operationInfo: setBitOfRegister8(Register8.H, 1, false),
  },
  {
    opcode: 0x8d,
    mnemonic: 'RES 1, L',
    operationInfo: setBitOfRegister8(Register8.L, 1, false),
  },
  {
    opcode: 0x8e,
    mnemonic: 'RES 1, (HL)',
    operationInfo: setBitOfHlAddress(1, false),
  },
  {
    opcode: 0x8f,
    mnemonic: 'RES 1, A',
    operationInfo: setBitOfRegister8(Register8.A, 1, false),
  },
  {
    opcode: 0x90,
    mnemonic: 'RES 2, B',
    operationInfo: setBitOfRegister8(Register8.B, 2, false),
  },
  {
    opcode: 0x91,
    mnemonic: 'RES 2, C',
    operationInfo: setBitOfRegister8(Register8.C, 2, false),
  },
  {
    opcode: 0x92,
    mnemonic: 'RES 2, D',
    operationInfo: setBitOfRegister8(Register8.D, 2, false),
  },
  {
    opcode: 0x93,
    mnemonic: 'RES 2, E',
    operationInfo: setBitOfRegister8(Register8.E, 2, false),
  },
  {
    opcode: 0x94,
    mnemonic: 'RES 2, H',
    operationInfo: setBitOfRegister8(Register8.H, 2, false),
  },
  {
    opcode: 0x95,
    mnemonic: 'RES 2, L',
    operationInfo: setBitOfRegister8(Register8.L, 2, false),
  },
  {
    opcode: 0x96,
    mnemonic: 'RES 2, (HL)',
    operationInfo: setBitOfHlAddress(2, false),
  },
  {
    opcode: 0x97,
    mnemonic: 'RES 2, A',
    operationInfo: setBitOfRegister8(Register8.A, 2, false),
  },
  {
    opcode: 0x98,
    mnemonic: 'RES 3, B',
    operationInfo: setBitOfRegister8(Register8.B, 3, false),
  },
  {
    opcode: 0x99,
    mnemonic: 'RES 3, C',
    operationInfo: setBitOfRegister8(Register8.C, 3, false),
  },
  {
    opcode: 0x9a,
    mnemonic: 'RES 3, D',
    operationInfo: setBitOfRegister8(Register8.D, 3, false),
  },
  {
    opcode: 0x9b,
    mnemonic: 'RES 3, E',
    operationInfo: setBitOfRegister8(Register8.E, 3, false),
  },
  {
    opcode: 0x9c,
    mnemonic: 'RES 3, H',
    operationInfo: setBitOfRegister8(Register8.H, 3, false),
  },
  {
    opcode: 0x9d,
    mnemonic: 'RES 3, L',
    operationInfo: setBitOfRegister8(Register8.L, 3, false),
  },
  {
    opcode: 0x9e,
    mnemonic: 'RES 3, (HL)',
    operationInfo: setBitOfHlAddress(3, false),
  },
  {
    opcode: 0x9f,
    mnemonic: 'RES 3, A',
    operationInfo: setBitOfRegister8(Register8.A, 3, false),
  },
  {
    opcode: 0xa0,
    mnemonic: 'RES 4, B',
    operationInfo: setBitOfRegister8(Register8.B, 4, false),
  },
  {
    opcode: 0xa1,
    mnemonic: 'RES 4, C',
    operationInfo: setBitOfRegister8(Register8.C, 4, false),
  },
  {
    opcode: 0xa2,
    mnemonic: 'RES 4, D',
    operationInfo: setBitOfRegister8(Register8.D, 4, false),
  },
  {
    opcode: 0xa3,
    mnemonic: 'RES 4, E',
    operationInfo: setBitOfRegister8(Register8.E, 4, false),
  },
  {
    opcode: 0xa4,
    mnemonic: 'RES 4, H',
    operationInfo: setBitOfRegister8(Register8.H, 4, false),
  },
  {
    opcode: 0xa5,
    mnemonic: 'RES 4, L',
    operationInfo: setBitOfRegister8(Register8.L, 4, false),
  },
  {
    opcode: 0xa6,
    mnemonic: 'RES 4, (HL)',
    operationInfo: setBitOfHlAddress(4, false),
  },
  {
    opcode: 0xa7,
    mnemonic: 'RES 4, A',
    operationInfo: setBitOfRegister8(Register8.A, 4, false),
  },
  {
    opcode: 0xa8,
    mnemonic: 'RES 5, B',
    operationInfo: setBitOfRegister8(Register8.B, 5, false),
  },
  {
    opcode: 0xa9,
    mnemonic: 'RES 5, C',
    operationInfo: setBitOfRegister8(Register8.C, 5, false),
  },
  {
    opcode: 0xaa,
    mnemonic: 'RES 5, D',
    operationInfo: setBitOfRegister8(Register8.D, 5, false),
  },
  {
    opcode: 0xab,
    mnemonic: 'RES 5, E',
    operationInfo: setBitOfRegister8(Register8.E, 5, false),
  },
  {
    opcode: 0xac,
    mnemonic: 'RES 5, H',
    operationInfo: setBitOfRegister8(Register8.H, 5, false),
  },
  {
    opcode: 0xad,
    mnemonic: 'RES 5, L',
    operationInfo: setBitOfRegister8(Register8.L, 5, false),
  },
  {
    opcode: 0xae,
    mnemonic: 'RES 5, (HL)',
    operationInfo: setBitOfHlAddress(5, false),
  },
  {
    opcode: 0xaf,
    mnemonic: 'RES 5, A',
    operationInfo: setBitOfRegister8(Register8.A, 5, false),
  },
  {
    opcode: 0xb0,
    mnemonic: 'RES 6, B',
    operationInfo: setBitOfRegister8(Register8.B, 6, false),
  },
  {
    opcode: 0xb1,
    mnemonic: 'RES 6, C',
    operationInfo: setBitOfRegister8(Register8.C, 6, false),
  },
  {
    opcode: 0xb2,
    mnemonic: 'RES 6, D',
    operationInfo: setBitOfRegister8(Register8.D, 6, false),
  },
  {
    opcode: 0xb3,
    mnemonic: 'RES 6, E',
    operationInfo: setBitOfRegister8(Register8.E, 6, false),
  },
  {
    opcode: 0xb4,
    mnemonic: 'RES 6, H',
    operationInfo: setBitOfRegister8(Register8.H, 6, false),
  },
  {
    opcode: 0xb5,
    mnemonic: 'RES 6, L',
    operationInfo: setBitOfRegister8(Register8.L, 6, false),
  },
  {
    opcode: 0xb6,
    mnemonic: 'RES 6, (HL)',
    operationInfo: setBitOfHlAddress(6, false),
  },
  {
    opcode: 0xb7,
    mnemonic: 'RES 6, A',
    operationInfo: setBitOfRegister8(Register8.A, 6, false),
  },
  {
    opcode: 0xb8,
    mnemonic: 'RES 7, B',
    operationInfo: setBitOfRegister8(Register8.B, 7, false),
  },
  {
    opcode: 0xb9,
    mnemonic: 'RES 7, C',
    operationInfo: setBitOfRegister8(Register8.C, 7, false),
  },
  {
    opcode: 0xba,
    mnemonic: 'RES 7, D',
    operationInfo: setBitOfRegister8(Register8.D, 7, false),
  },
  {
    opcode: 0xbb,
    mnemonic: 'RES 7, E',
    operationInfo: setBitOfRegister8(Register8.E, 7, false),
  },
  {
    opcode: 0xbc,
    mnemonic: 'RES 7, H',
    operationInfo: setBitOfRegister8(Register8.H, 7, false),
  },
  {
    opcode: 0xbd,
    mnemonic: 'RES 7, L',
    operationInfo: setBitOfRegister8(Register8.L, 7, false),
  },
  {
    opcode: 0xbe,
    mnemonic: 'RES 7, (HL)',
    operationInfo: setBitOfHlAddress(7, false),
  },
  {
    opcode: 0xbf,
    mnemonic: 'RES 7, A',
    operationInfo: setBitOfRegister8(Register8.A, 7, false),
  },
  {
    opcode: 0xc0,
    mnemonic: 'SET 0, B',
    operationInfo: setBitOfRegister8(Register8.B, 0, true),
  },
  {
    opcode: 0xc1,
    mnemonic: 'SET 0, C',
    operationInfo: setBitOfRegister8(Register8.C, 0, true),
  },
  {
    opcode: 0xc2,
    mnemonic: 'SET 0, D',
    operationInfo: setBitOfRegister8(Register8.D, 0, true),
  },
  {
    opcode: 0xc3,
    mnemonic: 'SET 0, E',
    operationInfo: setBitOfRegister8(Register8.E, 0, true),
  },
  {
    opcode: 0xc4,
    mnemonic: 'SET 0, H',
    operationInfo: setBitOfRegister8(Register8.H, 0, true),
  },
  {
    opcode: 0xc5,
    mnemonic: 'SET 0, L',
    operationInfo: setBitOfRegister8(Register8.L, 0, true),
  },
  {
    opcode: 0xc6,
    mnemonic: 'SET 0, (HL)',
    operationInfo: setBitOfHlAddress(0, true),
  },
  {
    opcode: 0xc7,
    mnemonic: 'SET 0, A',
    operationInfo: setBitOfRegister8(Register8.A, 0, true),
  },
  {
    opcode: 0xc8,
    mnemonic: 'SET 1, B',
    operationInfo: setBitOfRegister8(Register8.B, 1, true),
  },
  {
    opcode: 0xc9,
    mnemonic: 'SET 1, C',
    operationInfo: setBitOfRegister8(Register8.C, 1, true),
  },
  {
    opcode: 0xca,
    mnemonic: 'SET 1, D',
    operationInfo: setBitOfRegister8(Register8.D, 1, true),
  },
  {
    opcode: 0xcb,
    mnemonic: 'SET 1, E',
    operationInfo: setBitOfRegister8(Register8.E, 1, true),
  },
  {
    opcode: 0xcc,
    mnemonic: 'SET 1, H',
    operationInfo: setBitOfRegister8(Register8.H, 1, true),
  },
  {
    opcode: 0xcd,
    mnemonic: 'SET 1, L',
    operationInfo: setBitOfRegister8(Register8.L, 1, true),
  },
  {
    opcode: 0xce,
    mnemonic: 'SET 1, (HL)',
    operationInfo: setBitOfHlAddress(1, true),
  },
  {
    opcode: 0xcf,
    mnemonic: 'SET 1, A',
    operationInfo: setBitOfRegister8(Register8.A, 1, true),
  },
  {
    opcode: 0xd0,
    mnemonic: 'SET 2, B',
    operationInfo: setBitOfRegister8(Register8.B, 2, true),
  },
  {
    opcode: 0xd1,
    mnemonic: 'SET 2, C',
    operationInfo: setBitOfRegister8(Register8.C, 2, true),
  },
  {
    opcode: 0xd2,
    mnemonic: 'SET 2, D',
    operationInfo: setBitOfRegister8(Register8.D, 2, true),
  },
  {
    opcode: 0xd3,
    mnemonic: 'SET 2, E',
    operationInfo: setBitOfRegister8(Register8.E, 2, true),
  },
  {
    opcode: 0xd4,
    mnemonic: 'SET 2, H',
    operationInfo: setBitOfRegister8(Register8.H, 2, true),
  },
  {
    opcode: 0xd5,
    mnemonic: 'SET 2, L',
    operationInfo: setBitOfRegister8(Register8.L, 2, true),
  },
  {
    opcode: 0xd6,
    mnemonic: 'SET 2, (HL)',
    operationInfo: setBitOfHlAddress(2, true),
  },
  {
    opcode: 0xd7,
    mnemonic: 'SET 2, A',
    operationInfo: setBitOfRegister8(Register8.A, 2, true),
  },
  {
    opcode: 0xd8,
    mnemonic: 'SET 3, B',
    operationInfo: setBitOfRegister8(Register8.B, 3, true),
  },
  {
    opcode: 0xd9,
    mnemonic: 'SET 3, C',
    operationInfo: setBitOfRegister8(Register8.C, 3, true),
  },
  {
    opcode: 0xda,
    mnemonic: 'SET 3, D',
    operationInfo: setBitOfRegister8(Register8.D, 3, true),
  },
  {
    opcode: 0xdb,
    mnemonic: 'SET 3, E',
    operationInfo: setBitOfRegister8(Register8.E, 3, true),
  },
  {
    opcode: 0xdc,
    mnemonic: 'SET 3, H',
    operationInfo: setBitOfRegister8(Register8.H, 3, true),
  },
  {
    opcode: 0xdd,
    mnemonic: 'SET 3, L',
    operationInfo: setBitOfRegister8(Register8.L, 3, true),
  },
  {
    opcode: 0xde,
    mnemonic: 'SET 3, (HL)',
    operationInfo: setBitOfHlAddress(3, true),
  },
  {
    opcode: 0xdf,
    mnemonic: 'SET 3, A',
    operationInfo: setBitOfRegister8(Register8.A, 3, true),
  },
  {
    opcode: 0xe0,
    mnemonic: 'SET 4, B',
    operationInfo: setBitOfRegister8(Register8.B, 4, true),
  },
  {
    opcode: 0xe1,
    mnemonic: 'SET 4, C',
    operationInfo: setBitOfRegister8(Register8.C, 4, true),
  },
  {
    opcode: 0xe2,
    mnemonic: 'SET 4, D',
    operationInfo: setBitOfRegister8(Register8.D, 4, true),
  },
  {
    opcode: 0xe3,
    mnemonic: 'SET 4, E',
    operationInfo: setBitOfRegister8(Register8.E, 4, true),
  },
  {
    opcode: 0xe4,
    mnemonic: 'SET 4, H',
    operationInfo: setBitOfRegister8(Register8.H, 4, true),
  },
  {
    opcode: 0xe5,
    mnemonic: 'SET 4, L',
    operationInfo: setBitOfRegister8(Register8.L, 4, true),
  },
  {
    opcode: 0xe6,
    mnemonic: 'SET 4, (HL)',
    operationInfo: setBitOfHlAddress(4, true),
  },
  {
    opcode: 0xe7,
    mnemonic: 'SET 4, A',
    operationInfo: setBitOfRegister8(Register8.A, 4, true),
  },
  {
    opcode: 0xe8,
    mnemonic: 'SET 5, B',
    operationInfo: setBitOfRegister8(Register8.B, 5, true),
  },
  {
    opcode: 0xe9,
    mnemonic: 'SET 5, C',
    operationInfo: setBitOfRegister8(Register8.C, 5, true),
  },
  {
    opcode: 0xea,
    mnemonic: 'SET 5, D',
    operationInfo: setBitOfRegister8(Register8.D, 5, true),
  },
  {
    opcode: 0xeb,
    mnemonic: 'SET 5, E',
    operationInfo: setBitOfRegister8(Register8.E, 5, true),
  },
  {
    opcode: 0xec,
    mnemonic: 'SET 5, H',
    operationInfo: setBitOfRegister8(Register8.H, 5, true),
  },
  {
    opcode: 0xed,
    mnemonic: 'SET 5, L',
    operationInfo: setBitOfRegister8(Register8.L, 5, true),
  },
  {
    opcode: 0xee,
    mnemonic: 'SET 5, (HL)',
    operationInfo: setBitOfHlAddress(5, true),
  },
  {
    opcode: 0xef,
    mnemonic: 'SET 5, A',
    operationInfo: setBitOfRegister8(Register8.A, 5, true),
  },
  {
    opcode: 0xf0,
    mnemonic: 'SET 6, B',
    operationInfo: setBitOfRegister8(Register8.B, 6, true),
  },
  {
    opcode: 0xf1,
    mnemonic: 'SET 6, C',
    operationInfo: setBitOfRegister8(Register8.C, 6, true),
  },
  {
    opcode: 0xf2,
    mnemonic: 'SET 6, D',
    operationInfo: setBitOfRegister8(Register8.D, 6, true),
  },
  {
    opcode: 0xf3,
    mnemonic: 'SET 6, E',
    operationInfo: setBitOfRegister8(Register8.E, 6, true),
  },
  {
    opcode: 0xf4,
    mnemonic: 'SET 6, H',
    operationInfo: setBitOfRegister8(Register8.H, 6, true),
  },
  {
    opcode: 0xf5,
    mnemonic: 'SET 6, L',
    operationInfo: setBitOfRegister8(Register8.L, 6, true),
  },
  {
    opcode: 0xf6,
    mnemonic: 'SET 6, (HL)',
    operationInfo: setBitOfHlAddress(6, true),
  },
  {
    opcode: 0xf7,
    mnemonic: 'SET 6, A',
    operationInfo: setBitOfRegister8(Register8.A, 6, true),
  },
  {
    opcode: 0xf8,
    mnemonic: 'SET 7, B',
    operationInfo: setBitOfRegister8(Register8.B, 7, true),
  },
  {
    opcode: 0xf9,
    mnemonic: 'SET 7, C',
    operationInfo: setBitOfRegister8(Register8.C, 7, true),
  },
  {
    opcode: 0xfa,
    mnemonic: 'SET 7, D',
    operationInfo: setBitOfRegister8(Register8.D, 7, true),
  },
  {
    opcode: 0xfb,
    mnemonic: 'SET 7, E',
    operationInfo: setBitOfRegister8(Register8.E, 7, true),
  },
  {
    opcode: 0xfc,
    mnemonic: 'SET 7, H',
    operationInfo: setBitOfRegister8(Register8.H, 7, true),
  },
  {
    opcode: 0xfd,
    mnemonic: 'SET 7, L',
    operationInfo: setBitOfRegister8(Register8.L, 7, true),
  },
  {
    opcode: 0xfe,
    mnemonic: 'SET 7, (HL)',
    operationInfo: setBitOfHlAddress(7, true),
  },
  {
    opcode: 0xff,
    mnemonic: 'SET 7, A',
    operationInfo: setBitOfRegister8(Register8.A, 7, true),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
