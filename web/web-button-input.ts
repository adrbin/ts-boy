import { INPUT_DELAY } from '../lib/constants.js';
import { delay } from '../lib/utils.js';
import { Input } from '../lib/input.js';

export class WebButtonInputHandler {
  buttons: Record<string, HTMLButtonElement>;

  constructor(input: Input, buttons: Record<string, HTMLButtonElement>) {
    this.buttons = buttons;

    for (const key of Object.keys(buttons)) {
      const button = buttons[key];
      const onStart = () => {
        input.setInput(key, true);
      };

      const onEnd = async () => {
        await delay(INPUT_DELAY);

        input.setInput(key, false);
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
}
