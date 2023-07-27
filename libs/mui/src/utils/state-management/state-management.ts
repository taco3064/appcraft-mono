import _set from 'lodash/set';
import type * as Appcraft from '@appcraft/types';

import { splitProps } from '../props-parser';
import type * as Types from './state-management.types';

const convert2State: Types.Convert2State = (arr, basePath, state) =>
  arr.reduce((result, item, i) => {
    Object.entries(item || {}).forEach(([key, value]) => {
      result[`${basePath}[${i}].${key}`] = value as never;
    });

    return result;
  }, state);

const convert2StateArray: Types.Convert2StateArray = (
  state,
  basePath,
  length
) =>
  Object.entries(state).reduce<Appcraft.WidgetState[]>(
    (result, [key, value]) => {
      if (key.startsWith(basePath)) {
        const matches = key
          .replace(new RegExp(`^${basePath}`), '')
          .match(/^\[(\d+)\]/);

        const i = Number.parseInt(matches?.[1] as string, 10);

        delete state[key];

        _set(
          result,
          [i, key.replace(new RegExp(`^${basePath}\\[${i}\\]\\.`), '')],
          value
        );
      }

      return result;
    },
    new Array(length).fill(undefined)
  );

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

export const removeState: Types.RemoveState = (
  category,
  { [category]: state = {}, ...states },
  basePath,
  index,
  length
) => {
  const target = convert2StateArray(state, basePath, length);

  target.splice(index, 1);

  return { ...states, [category]: convert2State(target, basePath, state) };
};

export const resortState: Types.ResortState = (
  category,
  { [category]: state = {}, ...states },
  basePath,
  [fm, to],
  length
) => {
  const target = convert2StateArray(state, basePath, length);
  const dragItem = target[fm];

  target.splice(fm, 1);
  target.splice(to, 0, dragItem);

  return { ...states, [category]: convert2State(target, basePath, state) };
};
