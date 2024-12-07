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
    operationInfo: shiftLeftRegister8(Register8.B, ShiftMode.Rotate),
  },
  {
    opcode: 0x01,
    operationInfo: shiftLeftRegister8(Register8.C, ShiftMode.Rotate),
  },
  {
    opcode: 0x02,
    operationInfo: shiftLeftRegister8(Register8.D, ShiftMode.Rotate),
  },
  {
    opcode: 0x03,
    operationInfo: shiftLeftRegister8(Register8.E, ShiftMode.Rotate),
  },
  {
    opcode: 0x04,
    operationInfo: shiftLeftRegister8(Register8.H, ShiftMode.Rotate),
  },
  {
    opcode: 0x05,
    operationInfo: shiftLeftRegister8(Register8.L, ShiftMode.Rotate),
  },
  {
    opcode: 0x06,
    operationInfo: shiftLeftHlAddress(ShiftMode.Rotate),
  },
  {
    opcode: 0x07,
    operationInfo: shiftLeftRegister8(Register8.A, ShiftMode.Rotate),
  },
  {
    opcode: 0x08,
    operationInfo: shiftRightRegister8(Register8.B, ShiftMode.Rotate),
  },
  {
    opcode: 0x09,
    operationInfo: shiftRightRegister8(Register8.C, ShiftMode.Rotate),
  },
  {
    opcode: 0x0a,
    operationInfo: shiftRightRegister8(Register8.D, ShiftMode.Rotate),
  },
  {
    opcode: 0x0b,
    operationInfo: shiftRightRegister8(Register8.E, ShiftMode.Rotate),
  },
  {
    opcode: 0x0c,
    operationInfo: shiftRightRegister8(Register8.H, ShiftMode.Rotate),
  },
  {
    opcode: 0x0d,
    operationInfo: shiftRightRegister8(Register8.L, ShiftMode.Rotate),
  },
  {
    opcode: 0x0e,
    operationInfo: shiftRightHlAddress(ShiftMode.Rotate),
  },
  {
    opcode: 0x0f,
    operationInfo: shiftRightRegister8(Register8.A, ShiftMode.Rotate),
  },
  {
    opcode: 0x10,
    operationInfo: shiftLeftRegister8(
      Register8.B,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x11,
    operationInfo: shiftLeftRegister8(
      Register8.C,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x12,
    operationInfo: shiftLeftRegister8(
      Register8.D,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x13,
    operationInfo: shiftLeftRegister8(
      Register8.E,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x14,
    operationInfo: shiftLeftRegister8(
      Register8.H,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x15,
    operationInfo: shiftLeftRegister8(
      Register8.L,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x16,
    operationInfo: shiftLeftHlAddress(ShiftMode.RotateThroughCarry),
  },
  {
    opcode: 0x17,
    operationInfo: shiftLeftRegister8(
      Register8.A,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x18,
    operationInfo: shiftRightRegister8(
      Register8.B,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x19,
    operationInfo: shiftRightRegister8(
      Register8.C,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1a,
    operationInfo: shiftRightRegister8(
      Register8.D,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1b,
    operationInfo: shiftRightRegister8(
      Register8.E,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1c,
    operationInfo: shiftRightRegister8(
      Register8.H,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1d,
    operationInfo: shiftRightRegister8(
      Register8.L,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x1e,
    operationInfo: shiftRightHlAddress(ShiftMode.RotateThroughCarry),
  },
  {
    opcode: 0x1f,
    operationInfo: shiftRightRegister8(
      Register8.A,
      ShiftMode.RotateThroughCarry,
    ),
  },
  {
    opcode: 0x20,
    operationInfo: shiftLeftRegister8(Register8.B, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x21,
    operationInfo: shiftLeftRegister8(Register8.C, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x22,
    operationInfo: shiftLeftRegister8(Register8.D, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x23,
    operationInfo: shiftLeftRegister8(Register8.E, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x24,
    operationInfo: shiftLeftRegister8(Register8.H, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x25,
    operationInfo: shiftLeftRegister8(Register8.L, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x26,
    operationInfo: shiftLeftHlAddress(ShiftMode.Arithmetic),
  },
  {
    opcode: 0x27,
    operationInfo: shiftLeftRegister8(Register8.A, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x28,
    operationInfo: shiftRightRegister8(Register8.B, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x29,
    operationInfo: shiftRightRegister8(Register8.C, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2a,
    operationInfo: shiftRightRegister8(Register8.D, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2b,
    operationInfo: shiftRightRegister8(Register8.E, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2c,
    operationInfo: shiftRightRegister8(Register8.H, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2d,
    operationInfo: shiftRightRegister8(Register8.L, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2e,
    operationInfo: shiftRightHlAddress(ShiftMode.Arithmetic),
  },
  {
    opcode: 0x2f,
    operationInfo: shiftRightRegister8(Register8.A, ShiftMode.Arithmetic),
  },
  {
    opcode: 0x30,
    operationInfo: swapRegister8(Register8.B),
  },
  {
    opcode: 0x31,
    operationInfo: swapRegister8(Register8.C),
  },
  {
    opcode: 0x32,
    operationInfo: swapRegister8(Register8.D),
  },
  {
    opcode: 0x33,
    operationInfo: swapRegister8(Register8.E),
  },
  {
    opcode: 0x34,
    operationInfo: swapRegister8(Register8.H),
  },
  {
    opcode: 0x35,
    operationInfo: swapRegister8(Register8.L),
  },
  {
    opcode: 0x36,
    operationInfo: swapHlAddress,
  },
  {
    opcode: 0x37,
    operationInfo: swapRegister8(Register8.A),
  },
  {
    opcode: 0x38,
    operationInfo: shiftRightRegister8(Register8.B, ShiftMode.Logical),
  },
  {
    opcode: 0x39,
    operationInfo: shiftRightRegister8(Register8.C, ShiftMode.Logical),
  },
  {
    opcode: 0x3a,
    operationInfo: shiftRightRegister8(Register8.D, ShiftMode.Logical),
  },
  {
    opcode: 0x3b,
    operationInfo: shiftRightRegister8(Register8.E, ShiftMode.Logical),
  },
  {
    opcode: 0x3c,
    operationInfo: shiftRightRegister8(Register8.H, ShiftMode.Logical),
  },
  {
    opcode: 0x3d,
    operationInfo: shiftRightRegister8(Register8.L, ShiftMode.Logical),
  },
  {
    opcode: 0x3e,
    operationInfo: shiftRightHlAddress(ShiftMode.Logical),
  },
  {
    opcode: 0x3f,
    operationInfo: shiftRightRegister8(Register8.A, ShiftMode.Logical),
  },
  {
    opcode: 0x40,
    operationInfo: testBitOfRegister8(Register8.B, 0),
  },
  {
    opcode: 0x41,
    operationInfo: testBitOfRegister8(Register8.C, 0),
  },
  {
    opcode: 0x42,
    operationInfo: testBitOfRegister8(Register8.D, 0),
  },
  {
    opcode: 0x43,
    operationInfo: testBitOfRegister8(Register8.E, 0),
  },
  {
    opcode: 0x44,
    operationInfo: testBitOfRegister8(Register8.H, 0),
  },
  {
    opcode: 0x45,
    operationInfo: testBitOfRegister8(Register8.L, 0),
  },
  {
    opcode: 0x46,
    operationInfo: testBitOfHlAddress(0),
  },
  {
    opcode: 0x47,
    operationInfo: testBitOfRegister8(Register8.A, 0),
  },
  {
    opcode: 0x48,
    operationInfo: testBitOfRegister8(Register8.B, 1),
  },
  {
    opcode: 0x49,
    operationInfo: testBitOfRegister8(Register8.C, 1),
  },
  {
    opcode: 0x4a,
    operationInfo: testBitOfRegister8(Register8.D, 1),
  },
  {
    opcode: 0x4b,
    operationInfo: testBitOfRegister8(Register8.E, 1),
  },
  {
    opcode: 0x4c,
    operationInfo: testBitOfRegister8(Register8.H, 1),
  },
  {
    opcode: 0x4d,
    operationInfo: testBitOfRegister8(Register8.L, 1),
  },
  {
    opcode: 0x4e,
    operationInfo: testBitOfHlAddress(1),
  },
  {
    opcode: 0x4f,
    operationInfo: testBitOfRegister8(Register8.A, 1),
  },
  {
    opcode: 0x50,
    operationInfo: testBitOfRegister8(Register8.B, 2),
  },
  {
    opcode: 0x51,
    operationInfo: testBitOfRegister8(Register8.C, 2),
  },
  {
    opcode: 0x52,
    operationInfo: testBitOfRegister8(Register8.D, 2),
  },
  {
    opcode: 0x53,
    operationInfo: testBitOfRegister8(Register8.E, 2),
  },
  {
    opcode: 0x54,
    operationInfo: testBitOfRegister8(Register8.H, 2),
  },
  {
    opcode: 0x55,
    operationInfo: testBitOfRegister8(Register8.L, 2),
  },
  {
    opcode: 0x56,
    operationInfo: testBitOfHlAddress(2),
  },
  {
    opcode: 0x57,
    operationInfo: testBitOfRegister8(Register8.A, 2),
  },
  {
    opcode: 0x58,
    operationInfo: testBitOfRegister8(Register8.B, 3),
  },
  {
    opcode: 0x59,
    operationInfo: testBitOfRegister8(Register8.C, 3),
  },
  {
    opcode: 0x5a,
    operationInfo: testBitOfRegister8(Register8.D, 3),
  },
  {
    opcode: 0x5b,
    operationInfo: testBitOfRegister8(Register8.E, 3),
  },
  {
    opcode: 0x5c,
    operationInfo: testBitOfRegister8(Register8.H, 3),
  },
  {
    opcode: 0x5d,
    operationInfo: testBitOfRegister8(Register8.L, 3),
  },
  {
    opcode: 0x5e,
    operationInfo: testBitOfHlAddress(3),
  },
  {
    opcode: 0x5f,
    operationInfo: testBitOfRegister8(Register8.A, 3),
  },
  {
    opcode: 0x60,
    operationInfo: testBitOfRegister8(Register8.B, 4),
  },
  {
    opcode: 0x61,
    operationInfo: testBitOfRegister8(Register8.C, 4),
  },
  {
    opcode: 0x62,
    operationInfo: testBitOfRegister8(Register8.D, 4),
  },
  {
    opcode: 0x63,
    operationInfo: testBitOfRegister8(Register8.E, 4),
  },
  {
    opcode: 0x64,
    operationInfo: testBitOfRegister8(Register8.H, 4),
  },
  {
    opcode: 0x65,
    operationInfo: testBitOfRegister8(Register8.L, 4),
  },
  {
    opcode: 0x66,
    operationInfo: testBitOfHlAddress(4),
  },
  {
    opcode: 0x67,
    operationInfo: testBitOfRegister8(Register8.A, 4),
  },
  {
    opcode: 0x68,
    operationInfo: testBitOfRegister8(Register8.B, 5),
  },
  {
    opcode: 0x69,
    operationInfo: testBitOfRegister8(Register8.C, 5),
  },
  {
    opcode: 0x6a,
    operationInfo: testBitOfRegister8(Register8.D, 5),
  },
  {
    opcode: 0x6b,
    operationInfo: testBitOfRegister8(Register8.E, 5),
  },
  {
    opcode: 0x6c,
    operationInfo: testBitOfRegister8(Register8.H, 5),
  },
  {
    opcode: 0x6d,
    operationInfo: testBitOfRegister8(Register8.L, 5),
  },
  {
    opcode: 0x6e,
    operationInfo: testBitOfHlAddress(5),
  },
  {
    opcode: 0x6f,
    operationInfo: testBitOfRegister8(Register8.A, 5),
  },
  {
    opcode: 0x70,
    operationInfo: testBitOfRegister8(Register8.B, 6),
  },
  {
    opcode: 0x71,
    operationInfo: testBitOfRegister8(Register8.C, 6),
  },
  {
    opcode: 0x72,
    operationInfo: testBitOfRegister8(Register8.D, 6),
  },
  {
    opcode: 0x73,
    operationInfo: testBitOfRegister8(Register8.E, 6),
  },
  {
    opcode: 0x74,
    operationInfo: testBitOfRegister8(Register8.H, 6),
  },
  {
    opcode: 0x75,
    operationInfo: testBitOfRegister8(Register8.L, 6),
  },
  {
    opcode: 0x76,
    operationInfo: testBitOfHlAddress(6),
  },
  {
    opcode: 0x77,
    operationInfo: testBitOfRegister8(Register8.A, 6),
  },
  {
    opcode: 0x78,
    operationInfo: testBitOfRegister8(Register8.B, 7),
  },
  {
    opcode: 0x79,
    operationInfo: testBitOfRegister8(Register8.C, 7),
  },
  {
    opcode: 0x7a,
    operationInfo: testBitOfRegister8(Register8.D, 7),
  },
  {
    opcode: 0x7b,
    operationInfo: testBitOfRegister8(Register8.E, 7),
  },
  {
    opcode: 0x7c,
    operationInfo: testBitOfRegister8(Register8.H, 7),
  },
  {
    opcode: 0x7d,
    operationInfo: testBitOfRegister8(Register8.L, 7),
  },
  {
    opcode: 0x7e,
    operationInfo: testBitOfHlAddress(7),
  },
  {
    opcode: 0x7f,
    operationInfo: testBitOfRegister8(Register8.A, 7),
  },
  {
    opcode: 0x80,
    operationInfo: setBitOfRegister8(Register8.B, 0, false),
  },
  {
    opcode: 0x81,
    operationInfo: setBitOfRegister8(Register8.C, 0, false),
  },
  {
    opcode: 0x82,
    operationInfo: setBitOfRegister8(Register8.D, 0, false),
  },
  {
    opcode: 0x83,
    operationInfo: setBitOfRegister8(Register8.E, 0, false),
  },
  {
    opcode: 0x84,
    operationInfo: setBitOfRegister8(Register8.H, 0, false),
  },
  {
    opcode: 0x85,
    operationInfo: setBitOfRegister8(Register8.L, 0, false),
  },
  {
    opcode: 0x86,
    operationInfo: setBitOfHlAddress(0, false),
  },
  {
    opcode: 0x87,
    operationInfo: setBitOfRegister8(Register8.A, 0, false),
  },
  {
    opcode: 0x88,
    operationInfo: setBitOfRegister8(Register8.B, 1, false),
  },
  {
    opcode: 0x89,
    operationInfo: setBitOfRegister8(Register8.C, 1, false),
  },
  {
    opcode: 0x8a,
    operationInfo: setBitOfRegister8(Register8.D, 1, false),
  },
  {
    opcode: 0x8b,
    operationInfo: setBitOfRegister8(Register8.E, 1, false),
  },
  {
    opcode: 0x8c,
    operationInfo: setBitOfRegister8(Register8.H, 1, false),
  },
  {
    opcode: 0x8d,
    operationInfo: setBitOfRegister8(Register8.L, 1, false),
  },
  {
    opcode: 0x8e,
    operationInfo: setBitOfHlAddress(1, false),
  },
  {
    opcode: 0x8f,
    operationInfo: setBitOfRegister8(Register8.A, 1, false),
  },
  {
    opcode: 0x90,
    operationInfo: setBitOfRegister8(Register8.B, 2, false),
  },
  {
    opcode: 0x91,
    operationInfo: setBitOfRegister8(Register8.C, 2, false),
  },
  {
    opcode: 0x92,
    operationInfo: setBitOfRegister8(Register8.D, 2, false),
  },
  {
    opcode: 0x93,
    operationInfo: setBitOfRegister8(Register8.E, 2, false),
  },
  {
    opcode: 0x94,
    operationInfo: setBitOfRegister8(Register8.H, 2, false),
  },
  {
    opcode: 0x95,
    operationInfo: setBitOfRegister8(Register8.L, 2, false),
  },
  {
    opcode: 0x96,
    operationInfo: setBitOfHlAddress(2, false),
  },
  {
    opcode: 0x97,
    operationInfo: setBitOfRegister8(Register8.A, 2, false),
  },
  {
    opcode: 0x98,
    operationInfo: setBitOfRegister8(Register8.B, 3, false),
  },
  {
    opcode: 0x99,
    operationInfo: setBitOfRegister8(Register8.C, 3, false),
  },
  {
    opcode: 0x9a,
    operationInfo: setBitOfRegister8(Register8.D, 3, false),
  },
  {
    opcode: 0x9b,
    operationInfo: setBitOfRegister8(Register8.E, 3, false),
  },
  {
    opcode: 0x9c,
    operationInfo: setBitOfRegister8(Register8.H, 3, false),
  },
  {
    opcode: 0x9d,
    operationInfo: setBitOfRegister8(Register8.L, 3, false),
  },
  {
    opcode: 0x9e,
    operationInfo: setBitOfHlAddress(3, false),
  },
  {
    opcode: 0x9f,
    operationInfo: setBitOfRegister8(Register8.A, 3, false),
  },
  {
    opcode: 0xa0,
    operationInfo: setBitOfRegister8(Register8.B, 4, false),
  },
  {
    opcode: 0xa1,
    operationInfo: setBitOfRegister8(Register8.C, 4, false),
  },
  {
    opcode: 0xa2,
    operationInfo: setBitOfRegister8(Register8.D, 4, false),
  },
  {
    opcode: 0xa3,
    operationInfo: setBitOfRegister8(Register8.E, 4, false),
  },
  {
    opcode: 0xa4,
    operationInfo: setBitOfRegister8(Register8.H, 4, false),
  },
  {
    opcode: 0xa5,
    operationInfo: setBitOfRegister8(Register8.L, 4, false),
  },
  {
    opcode: 0xa6,
    operationInfo: setBitOfHlAddress(4, false),
  },
  {
    opcode: 0xa7,
    operationInfo: setBitOfRegister8(Register8.A, 4, false),
  },
  {
    opcode: 0xa8,
    operationInfo: setBitOfRegister8(Register8.B, 5, false),
  },
  {
    opcode: 0xa9,
    operationInfo: setBitOfRegister8(Register8.C, 5, false),
  },
  {
    opcode: 0xaa,
    operationInfo: setBitOfRegister8(Register8.D, 5, false),
  },
  {
    opcode: 0xab,
    operationInfo: setBitOfRegister8(Register8.E, 5, false),
  },
  {
    opcode: 0xac,
    operationInfo: setBitOfRegister8(Register8.H, 5, false),
  },
  {
    opcode: 0xad,
    operationInfo: setBitOfRegister8(Register8.L, 5, false),
  },
  {
    opcode: 0xae,
    operationInfo: setBitOfHlAddress(5, false),
  },
  {
    opcode: 0xaf,
    operationInfo: setBitOfRegister8(Register8.A, 5, false),
  },
  {
    opcode: 0xb0,
    operationInfo: setBitOfRegister8(Register8.B, 6, false),
  },
  {
    opcode: 0xb1,
    operationInfo: setBitOfRegister8(Register8.C, 6, false),
  },
  {
    opcode: 0xb2,
    operationInfo: setBitOfRegister8(Register8.D, 6, false),
  },
  {
    opcode: 0xb3,
    operationInfo: setBitOfRegister8(Register8.E, 6, false),
  },
  {
    opcode: 0xb4,
    operationInfo: setBitOfRegister8(Register8.H, 6, false),
  },
  {
    opcode: 0xb5,
    operationInfo: setBitOfRegister8(Register8.L, 6, false),
  },
  {
    opcode: 0xb6,
    operationInfo: setBitOfHlAddress(6, false),
  },
  {
    opcode: 0xb7,
    operationInfo: setBitOfRegister8(Register8.A, 6, false),
  },
  {
    opcode: 0xb8,
    operationInfo: setBitOfRegister8(Register8.B, 7, false),
  },
  {
    opcode: 0xb9,
    operationInfo: setBitOfRegister8(Register8.C, 7, false),
  },
  {
    opcode: 0xba,
    operationInfo: setBitOfRegister8(Register8.D, 7, false),
  },
  {
    opcode: 0xbb,
    operationInfo: setBitOfRegister8(Register8.E, 7, false),
  },
  {
    opcode: 0xbc,
    operationInfo: setBitOfRegister8(Register8.H, 7, false),
  },
  {
    opcode: 0xbd,
    operationInfo: setBitOfRegister8(Register8.L, 7, false),
  },
  {
    opcode: 0xbe,
    operationInfo: setBitOfHlAddress(7, false),
  },
  {
    opcode: 0xbf,
    operationInfo: setBitOfRegister8(Register8.A, 7, false),
  },
  {
    opcode: 0xc0,
    operationInfo: setBitOfRegister8(Register8.B, 0, true),
  },
  {
    opcode: 0xc1,
    operationInfo: setBitOfRegister8(Register8.C, 0, true),
  },
  {
    opcode: 0xc2,
    operationInfo: setBitOfRegister8(Register8.D, 0, true),
  },
  {
    opcode: 0xc3,
    operationInfo: setBitOfRegister8(Register8.E, 0, true),
  },
  {
    opcode: 0xc4,
    operationInfo: setBitOfRegister8(Register8.H, 0, true),
  },
  {
    opcode: 0xc5,
    operationInfo: setBitOfRegister8(Register8.L, 0, true),
  },
  {
    opcode: 0xc6,
    operationInfo: setBitOfHlAddress(0, true),
  },
  {
    opcode: 0xc7,
    operationInfo: setBitOfRegister8(Register8.A, 0, true),
  },
  {
    opcode: 0xc8,
    operationInfo: setBitOfRegister8(Register8.B, 1, true),
  },
  {
    opcode: 0xc9,
    operationInfo: setBitOfRegister8(Register8.C, 1, true),
  },
  {
    opcode: 0xca,
    operationInfo: setBitOfRegister8(Register8.D, 1, true),
  },
  {
    opcode: 0xcb,
    operationInfo: setBitOfRegister8(Register8.E, 1, true),
  },
  {
    opcode: 0xcc,
    operationInfo: setBitOfRegister8(Register8.H, 1, true),
  },
  {
    opcode: 0xcd,
    operationInfo: setBitOfRegister8(Register8.L, 1, true),
  },
  {
    opcode: 0xce,
    operationInfo: setBitOfHlAddress(1, true),
  },
  {
    opcode: 0xcf,
    operationInfo: setBitOfRegister8(Register8.A, 1, true),
  },
  {
    opcode: 0xd0,
    operationInfo: setBitOfRegister8(Register8.B, 2, true),
  },
  {
    opcode: 0xd1,
    operationInfo: setBitOfRegister8(Register8.C, 2, true),
  },
  {
    opcode: 0xd2,
    operationInfo: setBitOfRegister8(Register8.D, 2, true),
  },
  {
    opcode: 0xd3,
    operationInfo: setBitOfRegister8(Register8.E, 2, true),
  },
  {
    opcode: 0xd4,
    operationInfo: setBitOfRegister8(Register8.H, 2, true),
  },
  {
    opcode: 0xd5,
    operationInfo: setBitOfRegister8(Register8.L, 2, true),
  },
  {
    opcode: 0xd6,
    operationInfo: setBitOfHlAddress(2, true),
  },
  {
    opcode: 0xd7,
    operationInfo: setBitOfRegister8(Register8.A, 2, true),
  },
  {
    opcode: 0xd8,
    operationInfo: setBitOfRegister8(Register8.B, 3, true),
  },
  {
    opcode: 0xd9,
    operationInfo: setBitOfRegister8(Register8.C, 3, true),
  },
  {
    opcode: 0xda,
    operationInfo: setBitOfRegister8(Register8.D, 3, true),
  },
  {
    opcode: 0xdb,
    operationInfo: setBitOfRegister8(Register8.E, 3, true),
  },
  {
    opcode: 0xdc,
    operationInfo: setBitOfRegister8(Register8.H, 3, true),
  },
  {
    opcode: 0xdd,
    operationInfo: setBitOfRegister8(Register8.L, 3, true),
  },
  {
    opcode: 0xde,
    operationInfo: setBitOfHlAddress(3, true),
  },
  {
    opcode: 0xdf,
    operationInfo: setBitOfRegister8(Register8.A, 3, true),
  },
  {
    opcode: 0xe0,
    operationInfo: setBitOfRegister8(Register8.B, 4, true),
  },
  {
    opcode: 0xe1,
    operationInfo: setBitOfRegister8(Register8.C, 4, true),
  },
  {
    opcode: 0xe2,
    operationInfo: setBitOfRegister8(Register8.D, 4, true),
  },
  {
    opcode: 0xe3,
    operationInfo: setBitOfRegister8(Register8.E, 4, true),
  },
  {
    opcode: 0xe4,
    operationInfo: setBitOfRegister8(Register8.H, 4, true),
  },
  {
    opcode: 0xe5,
    operationInfo: setBitOfRegister8(Register8.L, 4, true),
  },
  {
    opcode: 0xe6,
    operationInfo: setBitOfHlAddress(4, true),
  },
  {
    opcode: 0xe7,
    operationInfo: setBitOfRegister8(Register8.A, 4, true),
  },
  {
    opcode: 0xe8,
    operationInfo: setBitOfRegister8(Register8.B, 5, true),
  },
  {
    opcode: 0xe9,
    operationInfo: setBitOfRegister8(Register8.C, 5, true),
  },
  {
    opcode: 0xea,
    operationInfo: setBitOfRegister8(Register8.D, 5, true),
  },
  {
    opcode: 0xeb,
    operationInfo: setBitOfRegister8(Register8.E, 5, true),
  },
  {
    opcode: 0xec,
    operationInfo: setBitOfRegister8(Register8.H, 5, true),
  },
  {
    opcode: 0xed,
    operationInfo: setBitOfRegister8(Register8.L, 5, true),
  },
  {
    opcode: 0xee,
    operationInfo: setBitOfHlAddress(5, true),
  },
  {
    opcode: 0xef,
    operationInfo: setBitOfRegister8(Register8.A, 5, true),
  },
  {
    opcode: 0xf0,
    operationInfo: setBitOfRegister8(Register8.B, 6, true),
  },
  {
    opcode: 0xf1,
    operationInfo: setBitOfRegister8(Register8.C, 6, true),
  },
  {
    opcode: 0xf2,
    operationInfo: setBitOfRegister8(Register8.D, 6, true),
  },
  {
    opcode: 0xf3,
    operationInfo: setBitOfRegister8(Register8.E, 6, true),
  },
  {
    opcode: 0xf4,
    operationInfo: setBitOfRegister8(Register8.H, 6, true),
  },
  {
    opcode: 0xf5,
    operationInfo: setBitOfRegister8(Register8.L, 6, true),
  },
  {
    opcode: 0xf6,
    operationInfo: setBitOfHlAddress(6, true),
  },
  {
    opcode: 0xf7,
    operationInfo: setBitOfRegister8(Register8.A, 6, true),
  },
  {
    opcode: 0xf8,
    operationInfo: setBitOfRegister8(Register8.B, 7, true),
  },
  {
    opcode: 0xf9,
    operationInfo: setBitOfRegister8(Register8.C, 7, true),
  },
  {
    opcode: 0xfa,
    operationInfo: setBitOfRegister8(Register8.D, 7, true),
  },
  {
    opcode: 0xfb,
    operationInfo: setBitOfRegister8(Register8.E, 7, true),
  },
  {
    opcode: 0xfc,
    operationInfo: setBitOfRegister8(Register8.H, 7, true),
  },
  {
    opcode: 0xfd,
    operationInfo: setBitOfRegister8(Register8.L, 7, true),
  },
  {
    opcode: 0xfe,
    operationInfo: setBitOfHlAddress(7, true),
  },
  {
    opcode: 0xff,
    operationInfo: setBitOfRegister8(Register8.A, 7, true),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
