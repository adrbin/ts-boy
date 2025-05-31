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
    mnemonic: 'JR NZ, {}',
    operationInfo: jumpRelativeWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0x30,
    mnemonic: 'JR NC, {}',
    operationInfo: jumpRelativeWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0x18,
    mnemonic: 'JR {}',
    operationInfo: jumpRelativeWithCondition(_ => true),
  },
  {
    opcode: 0x28,
    mnemonic: 'JR Z, {}',
    operationInfo: jumpRelativeWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0x38,
    mnemonic: 'JR C, {}',
    operationInfo: jumpRelativeWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc0,
    mnemonic: 'RET NZ',
    operationInfo: returnWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd0,
    mnemonic: 'RET NC',
    operationInfo: returnWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xc8,
    mnemonic: 'RET Z',
    operationInfo: returnWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xd8,
    mnemonic: 'RET C',
    operationInfo: returnWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc9,
    mnemonic: 'RET',
    operationInfo: returnWithoutInterrupt,
  },
  {
    opcode: 0xd9,
    mnemonic: 'RETI',
    operationInfo: returnWithInterrupt,
  },
  {
    opcode: 0xc2,
    mnemonic: 'JP NZ, {}',
    operationInfo: jumpWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd2,
    mnemonic: 'JP NC, {}',
    operationInfo: jumpWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xc3,
    mnemonic: 'JP ',
    operationInfo: jumpWithCondition(_ => true),
  },
  {
    opcode: 0xca,
    mnemonic: 'JP Z, {}',
    operationInfo: jumpWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xda,
    mnemonic: 'JP C, {}',
    operationInfo: jumpWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xe9,
    mnemonic: 'JP HL',
    operationInfo: jumpFromHl,
  },
  {
    opcode: 0xc4,
    mnemonic: 'CALL NZ, {}',
    operationInfo: callWithCondition(flags => !flags[Flag.Zero]),
  },
  {
    opcode: 0xd4,
    mnemonic: 'CALL NC, {}',
    operationInfo: callWithCondition(flags => !flags[Flag.Carry]),
  },
  {
    opcode: 0xcd,
    mnemonic: 'CALL {}',
    operationInfo: callWithCondition(_ => true),
  },
  {
    opcode: 0xcc,
    mnemonic: 'CALL Z, {}',
    operationInfo: callWithCondition(flags => flags[Flag.Zero]),
  },
  {
    opcode: 0xdc,
    mnemonic: 'CALL C, {}',
    operationInfo: callWithCondition(flags => flags[Flag.Carry]),
  },
  {
    opcode: 0xc7,
    mnemonic: 'RST 00H',
    operationInfo: reset(0x00),
  },
  {
    opcode: 0xd7,
    mnemonic: 'RST 10H',
    operationInfo: reset(0x10),
  },
  {
    opcode: 0xe7,
    mnemonic: 'RST 20H',
    operationInfo: reset(0x20),
  },
  {
    opcode: 0xf7,
    mnemonic: 'RST 30H',
    operationInfo: reset(0x30),
  },
  {
    opcode: 0xcf,
    mnemonic: 'RST 08H',
    operationInfo: reset(0x08),
  },
  {
    opcode: 0xdf,
    mnemonic: 'RST 18H',
    operationInfo: reset(0x18),
  },
  {
    opcode: 0xef,
    mnemonic: 'RST 28H',
    operationInfo: reset(0x28),
  },
  {
    opcode: 0xff,
    mnemonic: 'RST 38H',
    operationInfo: reset(0x38),
  },
];

const operationCodesMap = buildOperationCodeMap(operationCodes);

export default operationCodesMap;
