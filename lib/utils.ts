import { BYTE_LENGTH } from './constants';

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
  return value.toString(16).toUpperCase();
};

export const joinNibbles = (...nibbles: number[]) => {
  return joinNumbers(nibbles, 8);
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

export const matchInstruction = (nibbles: number[], pattern: string) => {
  for (let i = 0; i < pattern.length; i++) {
    if (
      pattern[i].toLowerCase() === 'x' ||
      nibbles[i].toString(16) === pattern[i].toLowerCase()
    ) {
      continue;
    }
    return false;
  }

  return true;
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

export const getEnumValues = (en: Record<string, string | number>) => {
  return Object.values(en)
    .map(Number)
    .filter(x => !isNaN(x));
};

export const isSumZero = (...values: number[]) => {
  return values.reduce((acc, cur) => acc + cur, 0) === 0;
};

const checkCarry = (value: number, bit: number) => {
  const carryBit = 1 << bit;
  return (value & carryBit) === carryBit;
};

export const hasByteSumCarry = (...bytes: number[]) => {
  const sum = sumWithMask(bytes, 0xfff);
  return checkCarry(sum, 8);
};

export const hasWordSumCarry = (...words: number[]) => {
  const sum = sumWithMask(words, 0xffff);
  return checkCarry(sum, 16);
};

export const hasByteSumHalfCarry = (...bytes: number[]) => {
  const sum = sumWithMask(bytes, 0xfff);
  return checkCarry(sum, 4);
};

export const hasWordSumHalfCarry = (...words: number[]) => {
  const sum = sumWithMask(words, 0xfff);
  return checkCarry(sum, 12);
};

function sumWithMask(values: number[], mask: number) {
  return values.reduce((acc, cur) => {
    const maskedCur = cur & mask;
    return cur >= 0 ? acc + maskedCur : acc - maskedCur;
  }, 0);
}
