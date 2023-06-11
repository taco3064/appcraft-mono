import _toPath from 'lodash.topath';
import type { ExactProp, PropTypesDef } from '@appcraft/types';

import { getProptype } from './types-resolve.utils';
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

export const getNodeProperties: Types.GetNodeProperties = (() => {
  const findNodeProps = (proptype: PropTypesDef, paths: string[] = []) => {
    if (proptype.type === 'element' || proptype.type === 'node') {
      return { [paths.join('.')]: proptype.type };
    } else if (proptype.type === 'exact') {
      const { options: properties } = proptype as ExactProp;

      Object.entries(properties).reduce(
        (result, [propName, propOpts]) => ({
          ...result,
          ...findNodeProps(propOpts, [...paths, propName]),
        }),
        {}
      );
    }

    return {};
  };

  return (options) =>
    options.reduce((result, opts) => {
      const [source, root] = getSourceAndType(opts);
      const proptype = getProptype(root, { required: true }, source);

      if (proptype && !(opts.typeName in result)) {
        result[opts.typeName] = findNodeProps(proptype);
      }

      return result;
    }, {});
})();
