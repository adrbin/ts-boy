import { BYTE_LENGTH } from './constants.js';

export const delay = (ms?: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
};

export const getHigherNibble = (byte: number) => {
  return (byte >>> 4) & 0xf;
};

export const getLowerNibble = (byte: number) => {
  return byte & 0xf;
};

export const getHigherByte = (byte: number) => {
  return (byte >>> 8) & 0xff;
};

export const getLowerByte = (byte: number) => {
  return byte & 0xff;
};

export const nibblesToHex = (nibbles: number[]) => {
  return `0x${nibbles
    .map(nibble => nibble.toString(16).toUpperCase())
    .join('')}`;
};

export const toHex = (value: number) => {
  return `0x${toRawHex(value)}`;
};

export const toRawHex = (value: number, padding = 2) => {
  return value.toString(16).toUpperCase().padStart(padding, '0');
};

export const joinNibbles = (...nibbles: number[]) => {
  return joinNumbers(nibbles, 4);
};

export const joinBytes = (...bytes: number[]) => {
  return joinNumbers(bytes, 8);
};

export const joinNumbers = (numbers: number[], bitLength: number) => {
  return numbers.reduce((acc, cur, i) => acc + (cur << (i * bitLength)), 0);
};

export const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getNthBit = (value: number, index: number) => {
  return (value >>> index) & 1;
};

export const getNthBitFlag = (value: number, index: number) =>
  getNthBit(value, index) === 1;

export const setNthBit = (
  value: number,
  index: number,
  bit: boolean | number,
) => {
  return !!bit ? value | (1 << index) : value & ~(1 << index);
};

export const getBcd = (n: number, digits: number) => {
  const stack: number[] = [];
  for (let i = 0; i < digits; i++) {
    stack.push(n % 10);
    n /= 10;
  }

  return stack.reverse();
};

export const createByte = (bits: number[]) => {
  return parseInt(bits.join(''), 2);
};

export const doubleByte = (byte: number) => {
  let bits: number[] = [];
  for (let i = 0; i < BYTE_LENGTH; i++) {
    const bit = getNthBit(byte, i);
    bits.push(bit, bit);
  }

  return [
    createByte(bits.slice(0, BYTE_LENGTH)),
    createByte(bits.slice(BYTE_LENGTH)),
  ];
};

export const isByte = (value: number) => {
  return value >= 0 && value < 0x100;
};

export const isWord = (value: number) => {
  return value >= 0 && value < 0x10000;
};

export const toSignedByte = (unsignedByte: number) => {
  let pow = 1;
  let signedByte = 0;
  for (let i = 0; i < BYTE_LENGTH; i++) {
    const bit = getNthBit(unsignedByte, i);

    if (bit === 1) {
      if (i === BYTE_LENGTH - 1) {
        signedByte -= pow;
      } else {
        signedByte += pow;
      }
    }

    pow *= 2;
  }

  return signedByte;
};

export const toNibble = (value: number) => {
  return value & 0xf;
};

export const toByte = (value: number) => {
  return value & 0xff;
};

export const toWord = (value: number) => {
  return value & 0xffff;
};

export type Enum = Record<string, string | number>;

export const getEnumValues = <T>(en: Enum) => {
  return Object.values(en)
    .map(Number)
    .filter(x => !isNaN(x)) as T[];
};

export type FlagsObject = Record<number, boolean>;

export const getByteToFlagsObject = <T extends FlagsObject>(
  en: Enum,
  byte: number,
) => {
  return getEnumValues<number>(en).reduce((acc, index) => {
    acc[index] = getNthBitFlag(byte, index);
    return acc;
  }, {} as T);
};

export type NumericObject = Record<number, number>;

export const getByteToNumericObject = <T extends NumericObject>(
  en: Enum,
  byte: number,
) => {
  return getEnumValues<number>(en).reduce((acc, index) => {
    acc[index] = getNthBit(byte, index);
    return acc;
  }, {} as T);
};

export const getNumericObjectKeys = (object: any) => {
  return Object.keys(object)
    .map(Number)
    .filter(x => !isNaN(x)) as number[];
};

export const setByteFromFlagsObject = <T extends Partial<FlagsObject>>(
  flags: T,
  byte = 0,
) => {
  return getNumericObjectKeys(flags).reduce((acc, index) => {
    const value = flags[index];

    return value === undefined ? acc : setNthBit(acc, index, value);
  }, byte);
};

export const isByteSumZero = (...values: number[]) => {
  return toByte(values.reduce((acc, cur) => acc + cur, 0)) === 0;
};

export const hasByteAddCarry = (...bytes: number[]) => {
  const sum = addWithMask(bytes, 0xff);
  return checkCarry(sum, 8);
};

export const hasWordAddCarry = (...words: number[]) => {
  const sum = addWithMask(words, 0xffff);
  return checkCarry(sum, 16);
};

export const hasByteAddHalfCarry = (...bytes: number[]) => {
  const sum = addWithMask(bytes, 0xf);
  return checkCarry(sum, 4);
};

export const hasWordAddHalfCarry = (...words: number[]) => {
  const sum = addWithMask(words, 0xfff);
  return checkCarry(sum, 12);
};

function addWithMask(values: number[], mask: number) {
  return values.reduce((acc, cur) => {
    return acc + (cur & mask);
  }, 0);
}

export const hasByteSubtractCarry = (...bytes: number[]) => {
  const sum = subtractWithMask(bytes, 0xff);
  return checkCarry(sum, 8);
};

export const hasWordSubtractCarry = (...words: number[]) => {
  const sum = subtractWithMask(words, 0xffff);
  return checkCarry(sum, 16);
};

export const hasByteSubtractHalfCarry = (...bytes: number[]) => {
  const sum = subtractWithMask(bytes, 0xf);
  return checkCarry(sum, 4);
};

export const hasWordSubtractHalfCarry = (...words: number[]) => {
  const sum = subtractWithMask(words, 0xfff);
  return checkCarry(sum, 12);
};

function subtractWithMask(values: number[], mask: number) {
  return values.reduce((acc, cur) => {
    return acc + maskSignedValue(cur, mask);
  }, 0);
}

export function maskSignedValue(value: number, mask: number) {
  const maskedValue = Math.abs(value) & mask;
  return value >= 0 ? maskedValue : -maskedValue;
}

const checkCarry = (value: number, bit: number) => {
  const carryBit = 1 << bit;
  return (value & carryBit) === carryBit;
};
