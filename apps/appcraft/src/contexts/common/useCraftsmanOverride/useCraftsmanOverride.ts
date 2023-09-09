import _get from 'lodash/get';
import type * as Types from './useCraftsmanOverride.types';

const met: Types.MetType = {
  mixed: ({ typeName, propPath }) => {
    if (typeName === 'PropsState' && /^defaultValue$/.test(propPath)) {
      return 'STATE_DEFAULT_PROP_VALUE';
    }
  },

  naming: ({ typeName, propPath }) => {
    if (typeName === 'NodeState' && /^template\.todos$/.test(propPath)) {
      return 'TEMPLATE_TODO_NAMING';
    }
  },

  render: (kind, { typeName, propPath }) => {
    if (
      /^(ElementState|NodeState)$/.test(typeName) &&
      kind === 'pure' &&
      propPath === 'template.id'
    ) {
      return 'TEMPLATE_WIDGET_PICKER';
    }

    if (
      typeName === 'NodeState' &&
      kind === 'display' &&
      /^template\.todos\..*$/.test(propPath)
    ) {
      return 'TEMPLATE_TODO_ITEM';
    }

    if (kind === 'pure' && typeName === 'WrapTodo' && propPath === 'todosId') {
      return 'TODO_WRAPPER_PICKER';
    }

    if (
      kind === 'pure' &&
      typeName === 'SetPropsTodo' &&
      /^props\[\d+\]\.propName$/.test(propPath)
    ) {
      return 'TODO_PROPS_PATH_PICKER';
    }

    if (
      kind === 'pure' &&
      typeName === 'SetStateTodo' &&
      /^states\[\d+\]\.state$/.test(propPath)
    ) {
      return 'TODO_STATE_PATH_PICKER';
    }

    if (
      kind === 'pure' &&
      typeName === 'SetPropsTodo' &&
      /^props\[\d+\]\.group$/.test(propPath)
    ) {
      return 'TODO_PROPS_GROUP_PICKER';
    }

    if (
      kind === 'pure' &&
      ((typeName === 'VariableTodo' &&
        /^variables\..+\.initial\.source$/.test(propPath)) ||
        (typeName === 'FetchTodo' && /^data\.source$/.test(propPath)) ||
        (typeName === 'IterateTodo' && /^source\.source$/.test(propPath)) ||
        (typeName === 'ConditionBranchTodo' &&
          /^sources\[\d+\]\.source$/.test(propPath)))
    ) {
      return 'TODO_VARIABLE_SOURCE';
    }
  },
};

export const useCraftsmanOverride: Types.CraftsmanOverrideHook =
  (override) => (opts) => ({
    overrideMixedOptions: (options) =>
      _get(override, met.mixed(options) as string)?.(opts, options),

    overrideNamingProps: (options) =>
      _get(override, met.naming(options) as string)?.(opts, options),

    renderOverrideItem: (...args) =>
      _get(override, met.render(...args) as string)?.(opts, ...args),
  });
