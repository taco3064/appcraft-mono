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
