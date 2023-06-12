import type { GetOrderSeqUtil } from './useTypeCategory.types';

const regs: RegExp[] = [
  /^(node|element)$/,
  /^(arrayOf|exact|object|objectOf)$/,
  /^(oneOfType)$/,
  /^(bool|instanceOf|number|oneOf|string)$/,
  /^(func)$/,
];

export const getOrderSeq: GetOrderSeqUtil = (type) =>
  regs.findIndex((value) => value.test(type));
