import { Clock } from '../clock';
import { GameboyCpu } from '../gameboy-cpu';

export type OperationCallback = (cpu: GameboyCpu) => void;

export interface Operation {
  readonly opcode: number;
  readonly operationInfo: OperationInfo;
}

export interface OperationInfo {
  readonly operation: OperationCallback;
  readonly length: number;
  readonly clock: Readonly<Clock>;
  readonly clockWithBranching?: Readonly<Clock>;
}
