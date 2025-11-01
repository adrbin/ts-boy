import { INPUT_DELAY, KEY_MAPPING } from '../lib/constants.js';
import { delay } from '../lib/utils.js';
import { Input } from '../lib/input.js';

export class WebKeyboardInputHandler {
  constructor(input: Input) {
    window.addEventListener('keydown', event => {
      const pressedKey = KEY_MAPPING[event.key.toLowerCase()];
      if (pressedKey === undefined) {
        return;
      }

      input.setInput(pressedKey, false);
    });

    window.addEventListener('keyup', async event => {
      const pressedKey = KEY_MAPPING[event.key.toLowerCase()];
      if (pressedKey === undefined) {
        return;
      }

      await delay(INPUT_DELAY);

      input.setInput(pressedKey, true);
    });
  }
}
