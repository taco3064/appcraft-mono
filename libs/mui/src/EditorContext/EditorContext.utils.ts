import _get from 'lodash.get';
import type { GetPropPathString } from './EditorContext.types';

export const getPropPathString: GetPropPathString = (values, paths) =>
  paths.reduce<string>((result, propName, i) => {
    const isArrayEl = Array.isArray(_get(values, paths.slice(0, i)));

    return isArrayEl
      ? `${result}[${propName}]`
      : `${result ? `${result}.` : ''}${propName}`;
  }, '');
