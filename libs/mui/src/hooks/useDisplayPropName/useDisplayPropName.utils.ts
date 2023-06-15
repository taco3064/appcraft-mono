import type { GetDisplayPropNameUtil } from './useDisplayPropName.types';

export const getDisplayPropName: GetDisplayPropNameUtil = (propName) =>
  propName
    ?.replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase()) || '';
