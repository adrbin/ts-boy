import { INPUT_ADDRESS, Interrupt } from './constants.js';
import { Memory } from './memory.js';
import { FlagsObject, getNthBit, setByteFromFlagsObject } from './utils.js';

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
    [DirectionalInput.Right]: false,
    [DirectionalInput.Left]: false,
    [DirectionalInput.Up]: false,
    [DirectionalInput.Down]: false,
  };

  #buttonInputs: ButtonInputs = {
    [ButtonInput.A]: false,
    [ButtonInput.B]: false,
    [ButtonInput.Select]: false,
    [ButtonInput.Start]: false,
  };

  memory?: Memory;

  setInput(key: string, value: boolean) {
    const directionalInput =
      DirectionalInput[key as keyof typeof DirectionalInput];

    if (directionalInput) {
      this.setDirectionalInput(directionalInput, value);
      return;
    }

    const buttonInput = ButtonInput[key as keyof typeof ButtonInput];

    if (buttonInput) {
      this.setButtonInput(buttonInput, value);
      return;
    }
  }

  setDirectionalInput(directionalInput: DirectionalInput, value: boolean) {
    if (this.#directionalInputs[directionalInput] === value) {
      return;
    }

    this.#directionalInputs[directionalInput] = value;

    this.#writeInput(this.#directionalInputs, 4, value);
  }

  setButtonInput(buttonInput: ButtonInput, value: boolean) {
    if (this.#buttonInputs[buttonInput] === value) {
      return;
    }

    this.#buttonInputs[buttonInput] = value;

    this.#writeInput(this.#buttonInputs, 5, value);
  }

  #writeInput(inputs: FlagsObject, isActiveIndex: number, value: boolean) {
    if (!this.memory) {
      throw new Error('Memory is not set up for input.');
    }

    const input = this.memory.getByte(INPUT_ADDRESS);
    const isActive = getNthBit(input, isActiveIndex);
    if (isActive) {
      const newInput = setByteFromFlagsObject(inputs, input);
      this.memory.setByte(INPUT_ADDRESS, newInput);

      if (value) {
        this.memory.setIf({ [Interrupt.Joypad]: true });
      }
    }
  }
}
