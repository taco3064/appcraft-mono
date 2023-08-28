import _get from 'lodash/get';
import type * as Types from './useCraftedWidgetOverride.types';

const getOverrideRenderType: Types.GetOverrideRenderType = (
  kind,
  { typeName, propPath }
) => {
  if (
    kind === 'pure' &&
    /^(ElementState|NodeState)$/.test(typeName) &&
    propPath === 'template.id'
  ) {
    return 'WIDGET_PICKER';
  } else if (
    kind === 'pure' &&
    typeName === 'WrapTodo' &&
    propPath === 'todosId'
  ) {
    return 'TODO_PICKER';
  } else if (
    kind === 'pure' &&
    typeName === 'SetStateTodo' &&
    /^states\[\d+\]\.state$/.test(propPath)
  ) {
    return 'STATE_PICKER';
  }
};

export const useCraftedWidgetOverride: Types.CraftedWidgetOverrideHook =
  (override) =>
  (...args) =>
    _get(override, getOverrideRenderType(...args) as string)?.(...args);
