import alu8Operations from './alu8/operationCodes.js';
import alu16Operations from './alu16/operationCodes.js';
import controlOperations from './control/operationCodes.js';
import load8Operations from './load8/operationCodes.js';
import load16Operations from './load16/operationCodes.js';
import { OperationCode } from './operation.js';
import otherOperations from './other/operationCodes.js';
import rotateOperations from './rotate/operationCodes.js';

const operationCodesMap = new Map<number, OperationCode>();

const operationCodes = [
  ...alu8Operations,
  ...alu16Operations,
  ...controlOperations,
  ...load8Operations,
  ...load16Operations,
  ...otherOperations,
  ...rotateOperations,
];

for (const [opcode, operationCode] of operationCodes) {
  if (operationCodesMap.get(opcode)) {
    throw new Error(`Opcode ${opcode} already has been registered.`);
  }

  operationCodesMap.set(opcode, operationCode);
}

export default operationCodesMap;
