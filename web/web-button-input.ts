import { Input } from '../lib/gameboy-emulator.js';
import { INPUT_DELAY, KEY_MAPPING } from '../lib/constants.js';
import { delay } from '../lib/utils.js';

export class WebButtonInput implements Input {
  buttons: Record<string, HTMLButtonElement>;
  pressedKeys = new Set<string>();
  waitListeners: Record<string, () => void> = {};

  constructor(buttons: Record<string, HTMLButtonElement>) {
    this.buttons = buttons;

    for (const key of Object.keys(buttons)) {
      const button = buttons[key];
      const onStart = () => {
        if (!isValidKey(key)) {
          return;
        }

        this.pressedKeys.add(key);
      };

      const onEnd = async () => {
        if (!isValidKey(key)) {
          return;
        }

        await delay(INPUT_DELAY);

        this.pressedKeys.delete(key);
      };

      button.addEventListener('touchstart', onStart);
      button.addEventListener('touchmove', onStart);
      button.addEventListener('mousedown', onStart);
      button.addEventListener('touchend', onEnd);
      button.addEventListener('touchcancel', onEnd);
      button.addEventListener('mouseup', onEnd);
      button.addEventListener('mouseout', onEnd);
    }
  }

  getInput() {
    return this.pressedKeys;
  }
}

function isValidKey(key: string) {
  return Object.values(KEY_MAPPING).includes(key);
}
