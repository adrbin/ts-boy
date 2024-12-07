import { Flag } from '../../registers.js';
import { buildOperationCodeMap, OperationCode } from '../operation.js';
import {
  jumpRelativeWithCondition,
  returnWithCondition,
  returnWithoutInterrupt,
  returnWithInterrupt,
  jumpWithCondition,
  jumpFromHl,
  reset,
  callWithCondition,
} from './operationInfos.js';

const operationCodes: OperationCode[] = [
  {
    opcode: 0x20,
    operationInfo: jumpRelativeWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0x30,
    operationInfo: jumpRelativeWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0x18,
    operationInfo: jumpRelativeWithCondition(_ => true),
  },
  {
    opcode: 0x28,
    operationInfo: jumpRelativeWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0x38,
    operationInfo: jumpRelativeWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc0,
    operationInfo: returnWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd0,
    operationInfo: returnWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xc8,
    operationInfo: returnWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xd8,
    operationInfo: returnWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc9,
    operationInfo: returnWithoutInterrupt,
  },
  {
    opcode: 0xd9,
    operationInfo: returnWithInterrupt,
  },
  {
    opcode: 0xc2,
    operationInfo: jumpWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd2,
    operationInfo: jumpWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xc3,
    operationInfo: jumpWithCondition(_ => true),
  },
  {
    opcode: 0xca,
    operationInfo: jumpWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xda,
    operationInfo: jumpWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xe9,
    operationInfo: jumpFromHl,
  },
  {
    opcode: 0xc4,
    operationInfo: callWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd4,
    operationInfo: callWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xcd,
    operationInfo: callWithCondition(_ => true),
  },
  {
    opcode: 0xcc,
    operationInfo: callWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xdc,
    operationInfo: callWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc7,
    operationInfo: reset(0x00),
  },
  {
    opcode: 0xd7,
    operationInfo: reset(0x10),
  },
  {
    opcode: 0xe7,
    operationInfo: reset(0x20),
  },
  {
    opcode: 0xf7,
    operationInfo: reset(0x30),
  },
  {
    opcode: 0xcf,
    operationInfo: reset(0x08),
  },
  {
    opcode: 0xdf,
    operationInfo: reset(0x18),
  },
  {
    opcode: 0xef,
    operationInfo: reset(0x28),
  },
  {
    opcode: 0xff,
    operationInfo: reset(0x38),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
