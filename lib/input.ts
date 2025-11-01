import { INPUT_ADDRESS, Interrupt } from './constants.js';
import { Memory } from './memory.js';
import { getNthBit, setByteFromFlagsObject } from './utils.js';

export enum DirectionalInput {
  Right = 0,
  Left = 1,
  Up = 2,
  Down = 3,
}

export type DirectionalInputs = Record<DirectionalInput, boolean>;

export enum ButtonInput {
  A = 0,
  B = 1,
  Select = 2,
  Start = 3,
}

export type ButtonInputs = Record<ButtonInput, boolean>;

export class Input {
  #directionalInputs: DirectionalInputs = {
    [DirectionalInput.Right]: true,
    [DirectionalInput.Left]: true,
    [DirectionalInput.Up]: true,
    [DirectionalInput.Down]: true,
  };

  #buttonInputs: ButtonInputs = {
    [ButtonInput.A]: true,
    [ButtonInput.B]: true,
    [ButtonInput.Select]: true,
    [ButtonInput.Start]: true,
  };

  #memory?: Memory;

  setMemory(memory: Memory) {
    this.#memory = memory;
    memory.setByte(INPUT_ADDRESS, 0xff);
  }

  setInput(key: string, value: boolean) {
    const directionalInput =
      DirectionalInput[key as keyof typeof DirectionalInput];

    if (directionalInput !== undefined) {
      this.setDirectionalInput(directionalInput, value);
      return;
    }

    const buttonInput = ButtonInput[key as keyof typeof ButtonInput];

    if (buttonInput !== undefined) {
      this.setButtonInput(buttonInput, value);
      return;
    }
  }

  setDirectionalInput(directionalInput: DirectionalInput, value: boolean) {
    if (this.#directionalInputs[directionalInput] === value) {
      return;
    }

    this.#directionalInputs[directionalInput] = value;
    this.#writeInput();
    this.#checkInterrupt(value);
  }

  setButtonInput(buttonInput: ButtonInput, value: boolean) {
    if (this.#buttonInputs[buttonInput] === value) {
      return;
    }

    this.#buttonInputs[buttonInput] = value;
    this.#writeInput();
    this.#checkInterrupt(value);
  }

  getNewInput(input: number) {
    const directionalInputFlag = getNthBit(input, 4);
    const buttonInputFlag = getNthBit(input, 5);
    if (!directionalInputFlag) {
      return setByteFromFlagsObject(this.#directionalInputs, input);
    }

    if (!buttonInputFlag) {
      return setByteFromFlagsObject(this.#buttonInputs, input);
    }

    return 0xff;
  }

  #writeInput() {
    if (!this.#memory) {
      throw new Error('Memory is not set up for input.');
    }

    const oldInput = this.#memory.getByte(INPUT_ADDRESS);
    const newInput = this.getNewInput(oldInput);
    this.#memory.setByte(INPUT_ADDRESS, newInput);
  }

  #checkInterrupt(value: boolean) {
    if (!this.#memory) {
      throw new Error('Memory is not set up for input.');
    }

    if (!value) {
      this.#memory.setIf({ [Interrupt.Joypad]: true });
    }
  }
}
