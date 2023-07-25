import type * as Appcraft from '@appcraft/types';

import { splitProps } from '../props-parser';
import type * as Types from './state-management.types';

export const getStateCategory: Types.GetStateCategory = (generator) => {
  switch (generator) {
    case 'node':
      return 'nodes';
    case 'element':
      return 'nodes';
    default:
      return generator;
  }
};

export const getInitialState: Types.GetInitailState = (generator, alias) => {
  switch (generator) {
    case 'props':
      return {
        category: 'props',
        type: 'private',
        alias,
        description: '',
        defaultValue: undefined,
      };

    case 'todos':
      return {
        category: 'todos',
        type: 'public',
        alias,
        description: '',
      };

    default:
      return {
        category: 'nodes',
        type: 'private',
        nodeType: generator,
        alias,
        description: '',
        templateWidgetId: '',
        defaultValue: undefined,
      };
  }
};

export const getStateConfig: Types.GetStateConfig = (
  typeFile,
  category,
  { mixedTypes = {}, [category]: state }
) => {
  const overrideMixedTypes = Object.entries(mixedTypes).reduce<
    typeof mixedTypes
  >((result, [path, type]) => {
    if (path.startsWith(`${category}.`)) {
      result[path.replace(`${category}.`, '')] = type;
    }

    return result;
  }, {});

  switch (category) {
    case 'nodes':
      return {
        category: 'config',
        mixedTypes: overrideMixedTypes,
        typeFile,
        typeName: 'WidgetNodesState',
        props: splitProps(state),
      };

    case 'todos':
      return {
        category: 'config',
        mixedTypes: overrideMixedTypes,
        typeFile,
        typeName: 'WidgetTodosState',
        props: splitProps(state),
      };

    default:
      return {
        category: 'config',
        mixedTypes: overrideMixedTypes,
        typeFile,
        typeName: 'WidgetPropsState',
        props: splitProps(state),
      };
  }
};
