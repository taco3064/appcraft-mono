import _toPath from 'lodash.topath';

import { findNodeProps, getProptype } from './types-resolve.utils';
import { getSourceAndType, getTypeByPath } from '../common';
import type * as Types from './types-resolve.types';

//* Service Methods
export const parse: Types.ParseService = ({
  collectionPath = '',
  mixedTypes = {},
  ...options
}) => {
  const [source, root] = getSourceAndType(options);

  const types = getTypeByPath(root, {
    info: { required: true },
    paths: _toPath(collectionPath),
    mixedTypes,
    source,
  });

  return (types && getProptype(...types, source)) || null;
};

export const getNodeProperties: Types.GetNodeProperties = (options) =>
  options.reduce((result, opts) => {
    const sourceType = getSourceAndType(opts);

    if (!(opts.typeName in result)) {
      result[opts.typeName] = findNodeProps(...sourceType, {
        info: { required: true },
      });
    }

    return result;
  }, {});
