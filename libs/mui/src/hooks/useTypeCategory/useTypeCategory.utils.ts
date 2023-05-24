import type { GetOrderSeqFn } from './useTypeCategory.types';

export const getOrderSeq: GetOrderSeqFn = (type) => {
  if (/^(node|element)$/.test(type)) {
    return 0;
  }

  if (/^(arrayOf|exact|object|objectOf)$/.test(type)) {
    return 1;
  }

  if (/^(oneOfType)$/.test(type)) {
    return 2;
  }

  if (/^(bool|instanceOf|number|oneOf|string)$/.test(type)) {
    return 3;
  }

  if (/^(func)$/.test(type)) {
    return 4;
  }

  return -1;
};
