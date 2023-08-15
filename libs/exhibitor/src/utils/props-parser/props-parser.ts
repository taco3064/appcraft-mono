import _set from 'lodash/set';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './props-parser.types';

export const getProps = <P extends object>(
  props: Appcraft.ConfigOptions['props'],
  defaultProps?: P
) =>
  Object.entries(props || {}).reduce<P>(
    (result, [propPath, value]) => _set(result, propPath, value),
    (defaultProps || {}) as P
  );

export const getPropPath: Types.GetPropPath = (paths) =>
  paths.reduce<string>((result, propName) => {
    const str = propName.toString();

    //* For Array
    if (/^\d+$/.test(str)) {
      return `${result}[${propName}]`;
    } else if (/^\[\d+\]$/.test(str)) {
      return `${result}${propName}`;
    }

    //* For Object
    return `${result ? `${result}.` : ''}${propName}`;
  }, '');
