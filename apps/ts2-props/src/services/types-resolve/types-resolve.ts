import _toPath from 'lodash.topath';

import * as Common from '../common';
import { findNodesAndEventsProps, getProptype } from './types-resolve.utils';
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

export const getNodesAndEvents: Types.GetNodesAndEvents = (options) =>
  options.reduce(
    (result, opts) => {
      const sourceType = Common.getWidgetSourceAndType(opts);

      if (!(opts.typeName in result)) {
        const { nodes, events } = findNodesAndEventsProps(...sourceType, {
          info: { required: true },
        });

        result.nodes[opts.typeName] = nodes;
        result.events[opts.typeName] = events;
      }

      return result;
    },
    { nodes: {}, events: {} }
  );
