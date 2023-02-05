import { readFile, writeFile } from 'fs/promises';
import { Storage } from '../lib/gameboy-emulator';

export class WebStorage implements Storage {
  filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  save(data: any) {
    const json = JSON.stringify(data);
    localStorage.setItem(this.filename, json);
  }

  load() {
    const json = localStorage.getItem(this.filename);
    if (json === null || json === undefined) {
      return undefined;
    }
    return JSON.parse(json);
  }
}
