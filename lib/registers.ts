import {
  getEnumValues,
  getHigherByte,
  getLowerByte,
  getNthBit,
  getNthBitFlag,
  isByte,
  isWord,
  joinBytes,
  setNthBit,
  toByte,
  toWord,
} from './utils';

export enum Register8 {
  A = 'A',
  F = 'F',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  H = 'H',
  L = 'L',
}

enum Register16Combined {
  AF = 'AF',
  BC = 'BC',
  DE = 'DE',
  HL = 'HL',
}

enum Register16Standalone {
  SP = 'SP',
  PC = 'PC',
}

export const Register16 = {
  ...Register16Combined,
  ...Register16Standalone,
};

export type Register16 = Register16Combined | Register16Standalone;

export type Register = Register8 | Register16;

const registerMapping: Record<Register16Combined, [Register8, Register8]> = {
  [Register16Combined.AF]: [Register8.F, Register8.A],
  [Register16Combined.BC]: [Register8.C, Register8.B],
  [Register16Combined.DE]: [Register8.E, Register8.D],
  [Register16Combined.HL]: [Register8.L, Register8.H],
};

export enum Flag {
  Zero = 7,
  Negative = 6,
  HalfCarry = 5,
  Carry = 4,
}

export type Flags = Record<Flag, boolean>;

export class Registers {
  #registers8 = new Map<Register8, number>();
  #registers16 = new Map<Register16Standalone, number>();

  constructor() {
    for (const register of Object.values(Register8)) {
      this.#registers8.set(register, 0);
    }

    for (const register of Object.values(Register16Standalone)) {
      this.#registers16.set(register, 0);
    }
  }

  getByte(register8: Register8) {
    return this.#registers8.get(register8) as number;
  }

  setByte(register8: Register8, byte: number) {
    this.#checkByte(register8, byte);
    this.#registers8.set(register8, byte);
  }

  setRegister8(targetRegister8: Register8, sourceRegister8: Register8) {
    const byte = this.getByte(sourceRegister8);
    this.setByte(targetRegister8, byte);
  }

  incrementByte(register8: Register8, increment = 1) {
    const byte = this.getByte(register8);
    const newByte = toByte(byte + increment);

    this.setByte(register8, newByte);
  }

  decrementByte(register8: Register8, decrement = 1) {
    const currentByte = this.getByte(register8);
    const newByte = toByte(currentByte - decrement);

    this.setByte(register8, newByte);
  }

  getWord(register16: Register16) {
    if (register16 in Register16Standalone) {
      return this.#registers16.get(
        register16 as Register16Standalone,
      ) as number;
    }

    const bytes = registerMapping[register16 as Register16Combined].map(
      register8 => this.#registers8.get(register8) as number,
    );

    return joinBytes(...bytes);
  }

  setWord(register16: Register16, word: number) {
    this.#checkWord(register16, word);

    if (register16 in Register16Standalone) {
      this.#registers16.set(register16 as Register16Standalone, word);
      return;
    }

    const registers = registerMapping[register16 as Register16Combined];
    this.#registers8[registers[0]] = getLowerByte(word);
    this.#registers8[registers[1]] = getHigherByte(word);
  }

  setRegister16(targetRegister16: Register16, sourceRegister16: Register16) {
    const word = this.getWord(sourceRegister16);
    this.setWord(targetRegister16, word);
  }

  incrementWord(register16: Register16, increment = 1) {
    const currentWord = this.getWord(register16);
    const newWord = toWord(currentWord + increment);

    this.setWord(register16, newWord);
  }

  decrementWord(register16: Register16, decrement = 1) {
    const currentWord = this.getWord(register16);
    const newWord = toWord(currentWord - decrement);

    this.setWord(register16, newWord);
  }

  getFlags(): Flags {
    const f = this.getByte(Register8.F);

    const flags = getEnumValues(Flag).reduce((acc, flag) => {
      acc[flag] = getNthBitFlag(f, flag);
      return acc;
    }, {} as Flags);

    return flags;
  }

  setFlags(flags: Partial<Flags>) {
    let f = this.getByte(Register8.F);

    for (const flag of getEnumValues(Flag)) {
      const value = flags[flag];
      if (value !== undefined) {
        f = setNthBit(f, flag, value);
      }
    }

    this.setByte(Register8.F, f);
  }

  #checkByte(register8: Register8, value: number) {
    if (!isByte(value)) {
      throw new Error(`Byte overflow in the ${register8} register: ${value}`);
    }
  }

  #checkWord(register16: Register16, value: number) {
    if (!isWord(value)) {
      throw new Error(`Word overflow in the ${register16} register: ${value}`);
    }
  }
}
