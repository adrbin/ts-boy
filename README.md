# ts-boy

A Gameboy emulator written in TypeScript (work in progress).

**ts-boy** is a modular, cross-platform Gameboy emulator implemented in TypeScript. It aims for clarity, accuracy, and extensibility. The emulator is organized by hardware component, with each subsystem (CPU, GPU, Memory, Input, Display) implemented as a separate module under `lib/`.

> **Note:** ts-boy currently only runs in the browser. A console renderer for Node.js is possible in the future, but is not yet implemented.

## Features
- Accurate emulation of the original Gameboy hardware, including CPU, GPU, memory, and input handling
- Modular architecture: each hardware component is a standalone TypeScript class
- Opcode tables and metadata-driven CPU instruction dispatch for performance and maintainability
- Runs in the browser (see `web/` for browser integration)
- Supports loading and running `.gb` ROM files (place in `roms/`)
- Includes test ROMs and boot ROMs for validation and debugging
- No external frameworks; all logic is custom TypeScript

## Project Structure
- `lib/` — Core emulator logic and hardware components
- `lib/operations/` — CPU instruction implementations, organized by type
- `roms/` — Test and demo Gameboy ROMs
- `web/` — Browser integration (renderer, audio, input, storage)
- `static/` — Static assets for the web build
- `logs/` — Emulator logs (e.g., CPU traces)

## Getting Started
1. **Build:** Use VS Code tasks: `tsc: build - tsconfig.json` (one-off) or `tsc: watch - tsconfig.json` (continuous)
2. **Run in Browser:** Open `static/index.html` in your browser
3. **Run in Node.js:** Create a runner script or use a REPL to test modules directly
4. **Test ROMs:** Place `.gb` files in `roms/` and reference them when instantiating the emulator

## References

- http://imrannazar.com/GameBoy-Emulation-in-JavaScript:-The-CPU
- https://izik1.github.io/gbops/index.html
- https://gbdev.io/pandocs/CPU_Instruction_Set.html
- https://robdor.com/2016/08/10/gameboy-emulator-half-carry-flag/
- https://ehaskins.com/2018-01-30%20Z80%20DAA/
- http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf
- http://www.devrs.com/gb/files/opcodes.html
- https://jgmalcolm.com/z80/
- https://gbdev.gg8.se/wiki/articles/Gameboy_Bootstrap_ROM
- https://rgbds.gbdev.io/docs/v0.9.3/gbz80.7