import type { GetOrderSeqFn } from './useTypeCategory.types';

export const getOrderSeq: GetOrderSeqFn = (type) => {
  if (/^(arrayOf|exact|object|objectOf)$/.test(type)) {
    return 0;
  }

  if (/^(oneOfType)$/.test(type)) {
    return 1;
  }

  if (/^(bool|instanceOf|number|oneOf|string)$/.test(type)) {
    return 4;
  }

  if (/^(func)$/.test(type)) {
    return 5;
  }

  return -1;
};
