import { Input } from '../lib/gameboy-emulator.js';
import { INPUT_DELAY, KEY_MAPPING } from '../lib/constants.js';
import { delay } from '../lib/utils.js';

export class WebKeyboardInput implements Input {
  pressedKeys = new Set<string>();
  waitListener?: (event: KeyboardEvent) => void;

  constructor() {
    window.addEventListener('keydown', event => {
      const pressedKey = KEY_MAPPING[event.key];
      if (pressedKey === undefined) {
        return;
      }

      this.pressedKeys.add(pressedKey);
    });

    window.addEventListener('keyup', async event => {
      const pressedKey = KEY_MAPPING[event.key];
      if (pressedKey === undefined) {
        return;
      }

      await delay(INPUT_DELAY);

      this.pressedKeys.delete(pressedKey);
    });
  }

  getInput() {
    return this.pressedKeys;
  }
}
