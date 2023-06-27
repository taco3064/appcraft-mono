import _toPath from 'lodash.topath';

import * as Common from '../common';
import { findNodeProps, getProptype } from './types-resolve.utils';
import type * as Types from './types-resolve.types';

//* Service Methods
export const parseConfigs: Types.ParseConfigService = ({
  collectionPath = '',
  mixedTypes = {},
  ...options
}) => {
  const [source, root] = Common.getSourceAndType(options);

  const types = Common.getTypeByPath(root, {
    info: { required: true },
    paths: _toPath(collectionPath),
    mixedTypes,
    source,
  });

  return (types && getProptype(...types, source)) || null;
};

export const parseWidget: Types.ParseWidgetService = ({
  collectionPath = '',
  mixedTypes = {},
  ...options
}) => {
  const [source, root] = Common.getWidgetSourceAndType(options);

  const types = Common.getTypeByPath(root, {
    info: { required: true },
    paths: _toPath(collectionPath),
    mixedTypes,
    source,
  });

  return (types && getProptype(...types, source)) || null;
};

export const getNodeProperties: Types.GetNodeProperties = (options) =>
  options.reduce((result, opts) => {
    const sourceType = Common.getWidgetSourceAndType(opts);

    if (!(opts.typeName in result)) {
      result[opts.typeName] = findNodeProps(...sourceType, {
        info: { required: true },
      });
    }

    return result;
  }, {});
