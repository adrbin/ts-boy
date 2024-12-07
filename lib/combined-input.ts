import { Input } from './gameboy-emulator.js';

export class CombinedInput implements Input {
  inputs: Input[];

  constructor(...inputs: Input[]) {
    this.inputs = inputs;
  }

  getInput() {
    const result = new Set<string>();
    for (const input of this.inputs) {
      const inputResult = input.getInput();
      for (const key of inputResult) {
        result.add(key);
      }
    }

    return result;
  }
}
