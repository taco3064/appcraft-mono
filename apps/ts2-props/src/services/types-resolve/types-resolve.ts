import _topath from 'lodash/toPath';

import * as Common from '../common';
import { findNodesAndEventsProps, getProptype } from './types-resolve.utils';
import type * as Types from './types-resolve.types';

//* Service Methods
export const parse: Types.ParseService = ({
  collectionPath = '',
  mixedTypes = {},
  ...options
}) => {
  const [source, root] = Common.getSourceAndType(options);

  const types = Common.getTypeByPath(root, {
    info: { required: true },
    paths: _topath(collectionPath),
    mixedTypes,
    source,
  });

  return (types && getProptype(...types, source)) || null;
};

export const getNodesAndEvents: Types.GetNodesAndEvents = (options) =>
  options.reduce(
    (result, opts) => {
      const sourceType = Common.getSourceAndType(opts);

      if (!(opts.typeName in result)) {
        const key = `${opts.typeFile}#${opts.typeName}`;

        const { nodes, events } = findNodesAndEventsProps(...sourceType, {
          info: { required: true },
        });

        result.nodes[key] = nodes;
        result.events[key] = events;
      }

      return result;
    },
    { nodes: {}, events: {} }
  );
