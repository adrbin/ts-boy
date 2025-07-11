# Copilot Instructions for ts-boy

## Project Overview
- **ts-boy** is a Gameboy emulator written in TypeScript. The codebase is organized for clarity and modularity, with each hardware component implemented in its own file under `lib/`.
- The emulator targets both Node.js and browser environments (see `web/` for web integration).

## Architecture & Key Components
- **CPU, GPU, Memory, Input, Display**: Each major Gameboy subsystem is implemented as a TypeScript class/module in `lib/` (e.g., `gameboy-cpu.ts`, `gameboy-gpu.ts`, `memory.ts`, `input.ts`, `display.ts`).
- **Operations**: CPU instructions are organized by type in `lib/operations/` and subfolders (e.g., `alu8/`, `alu16/`, `load8/`, `control/`). Each has `operationCodes.ts` and `operationInfos.ts` for opcode mapping and metadata.
- **ROMs & Boot ROMs**: Test and demo ROMs are in `roms/`. Boot ROM binaries are in `lib/`.
- **Web Integration**: The `web/` directory contains browser-specific glue code (renderer, audio, input, storage).

## Developer Workflows
- **Build**: Use VS Code tasks: `tsc: build - tsconfig.json` (one-off) or `tsc: watch - tsconfig.json` (continuous). These compile TypeScript to JavaScript.
- **Run/Debug**: For browser, open `static/index.html` (loads the web build). For Node.js, create a runner script or use REPL for direct module testing.
- **ROM Testing**: Place `.gb` files in `roms/` and reference them in emulator instantiation.

## Project-Specific Patterns
- **Component Boundaries**: Each hardware subsystem is a separate module. Communication is via explicit method calls and shared memory objects.
- **Operation Dispatch**: CPU instruction decoding uses opcode tables in `lib/operations/` for fast lookup and metadata-driven execution.
- **Constants & Utilities**: Shared constants are in `lib/constants.ts`; bitwise helpers in `lib/bit-array.ts` and `lib/utils.ts`.
- **No Frameworks**: The project is framework-free; all logic is custom TypeScript.

## Conventions
- **File Naming**: Lowercase, dash-separated for files; PascalCase for classes.
- **ROMs**: Use descriptive names for test ROMs. Place only `.gb` files in `roms/`.
- **Logs**: Emulator logs (e.g., CPU traces) are in `logs/`.

## References
- See `README.md` for links to Gameboy technical docs and CPU references.
- Key files: `lib/gameboy-cpu.ts`, `lib/gameboy-gpu.ts`, `lib/memory.ts`, `web/ts-boy-web.ts`, `static/index.html`.

---

For AI agents: Adhere to the modular structure, respect component boundaries, and use opcode tables for CPU logic. When in doubt, follow patterns in `lib/operations/` and reference the web integration in `web/` for browser-specific logic.

**Do not duplicate code.** Always try to abstract and reuse common code, especially for utility functions. If you need a helper, check `lib/utils.ts` and prefer using or extending existing functions rather than reimplementing similar logic.
