import alu8Operations from './alu8/operationCodes';
import alu16Operations from './alu16/operationCodes';
import controlOperations from './control/operationCodes';
import load8Operations from './load8/operationCodes';
import load16Operations from './load16/operationCodes';
import { OperationCode } from './operation';
import otherOperations from './other/operationCodes';
import rotateOperations from './rotate/operationCodes';

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
  operationCodesMap.set(opcode, operationCode);
}

export default operationCodesMap;
