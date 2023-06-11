import _toPath from 'lodash.topath';

import { getProptype } from './types-resolve.utils';
import { getSourceAndType, getTypeByPath } from '../common';
import type * as Types from './types-resolve.types';

//* Service Methods
export const parse: Types.ParseService = ({
  collectionPath = '',
  mixedTypes = {},
  ...options
}) => {
  const [source, basicType] = getSourceAndType(options);

  const types = getTypeByPath(basicType, {
    info: { required: true },
    paths: _toPath(collectionPath),
    mixedTypes,
    source,
  });

  return (types && getProptype(...types, source)) || null;
};
