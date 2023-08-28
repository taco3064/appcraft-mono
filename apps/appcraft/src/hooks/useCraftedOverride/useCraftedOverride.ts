import _get from 'lodash/get';
import type * as Types from './useCraftedOverride.types';

const met: Types.MetType = {
  mixed: ({ typeFile, typeName, propPath }) => {
    if (typeName === 'PropsState' && /^defaultValue$/.test(propPath)) {
      return 'STATE_DEFAULT_PROP_VALUE';
    }
  },

  naming: ({ typeFile, typeName, propPath }) => {
    if (
      typeFile.includes('/@appcraft/types/src/widgets/state') &&
      typeName === 'NodeState' &&
      /^template\.todos$/.test(propPath)
    ) {
      return 'TEMPLATE_TODO_NAMING';
    }
  },

  render: (kind, { typeName, props, propPath }) => {
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
      return 'TEMPLATE_TODO_EDITOR';
    }

    if (kind === 'pure' && typeName === 'WrapTodo' && propPath === 'todosId') {
      return 'TODO_WRAPPER_PICKER';
    }

    if (
      kind === 'pure' &&
      typeName === 'SetStateTodo' &&
      /^states\[\d+\]\.state$/.test(propPath)
    ) {
      return 'TODO_STATE_PATH_PICKER';
    }
  },
};

export const useCraftedOverride: Types.CraftedOverrideHook = (override) => ({
  overrideMixedOptions: (options) =>
    _get(override, met.mixed(options) as string)?.(options),

  overrideNamingProps: (options) =>
    _get(override, met.naming(options) as string)?.(options),

  renderOverrideItem: (...args) =>
    _get(override, met.render(...args) as string)?.(...args),
});
