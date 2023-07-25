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

export const getStateConfig: Types.GetStateConfig = (() => {
  const getStateTypeName: Types.GetStateTypeName = (state) => {
    switch (state.category) {
      case 'props':
        return 'PropsState';
      case 'todos':
        return 'TodosState';
      default:
        return state.nodeType === 'element' ? 'ElementState' : 'NodeState';
    }
  };

  return (typeFile, { mixedTypes = {}, ...state }) => ({
    category: 'config',
    mixedTypes,
    typeFile,
    typeName: getStateTypeName(state),
    props: splitProps(state),
  });
})();
