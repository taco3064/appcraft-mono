import type * as Types from './useTypeItem.types';

const regs: RegExp[] = [
  /^(node|element)$/,
  /^(array|arrayOf|exact|object|objectOf)$/,
  /^(oneOfType)$/,
  /^(bool|instanceOf|number|oneOf|string)$/,
];

export const getDisplayPropName: Types.GetDisplayPropNameUtil = (propName) =>
  propName
    ?.replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase()) || '';

export const getOrderSeq: Types.GetOrderSeqUtil = (type) =>
  regs.findIndex((value) => value.test(type));
