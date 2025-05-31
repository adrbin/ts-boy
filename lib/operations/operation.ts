import { ClockData } from '../clock-data.js';
import { GameboyCpu } from '../gameboy-cpu.js';

export type OperationCallback = (cpu: GameboyCpu) => void;

export interface OperationCode {
  readonly opcode: number;
  readonly mnemonic: string;
  readonly operationInfo: OperationInfo;
}

export interface OperationInfo {
  readonly operation: OperationCallback;
  readonly length: number;
  readonly clock: Readonly<ClockData>;
  readonly clockWithBranching?: Readonly<ClockData>;
}

export const buildOperationCodeMap = (operationCodes: OperationCode[]) => {
  const operationCodesMap = new Map<number, OperationCode>();

  for (const operationCode of operationCodes) {
    if (operationCodesMap.get(operationCode.opcode)) {
      throw new Error(
        `Opcode ${operationCode.opcode} already has been registered.`,
      );
    }

    operationCodesMap.set(operationCode.opcode, operationCode);
  }

  return operationCodesMap;
};
