import { ClockData } from '../clock-data';
import { GameboyCpu } from '../gameboy-cpu';

export type OperationCallback = (cpu: GameboyCpu) => void;

export interface OperationCode {
  readonly opcode: number;
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
    operationCodesMap.set(operationCode.opcode, operationCode);
  }

  return operationCodesMap;
};
