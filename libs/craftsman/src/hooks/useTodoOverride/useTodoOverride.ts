import _get from 'lodash/get';
import type * as Types from './useTodoOverride.types';

const getOverrideRenderType: Types.GetOverrideRenderType = (
  kind,
  { props, propPath, typeName, typeFile }
) => {
  const isTodoFile = typeFile.includes('/types/src/widgets/todo');

  if (
    isTodoFile &&
    typeName === 'VariableTodo' &&
    /^variables\./.test(propPath) &&
    /\.initial\.path$/.test(propPath)
  ) {
    const mode = _get(props, propPath.replace(/\.initial\.path$/, '.mode'));
    const source = _get(props, propPath.replace(/\.path$/, '.source'));

    if (mode === 'extract') {
      return source === 'event' ? 'EVENT_PARAMS_PICKER' : 'OUTPUT_PATH_PICKER';
    }
  } else if (
    isTodoFile &&
    ((typeName === 'FetchTodo' && /^data\.path$/.test(propPath)) ||
      (typeName === 'ConditionBranchTodo' &&
        /^sources\[\d+\]\.path$/.test(propPath)) ||
      (typeName === 'IterateTodo' && /^source\.path$/.test(propPath)) ||
      (typeName === 'SetStateTodo' &&
        /^states\[\d+\]\.source\.path$/.test(propPath)) ||
      (typeName === 'SetPropsTodo' &&
        /^props\[\d+\]\.source\.path$/.test(propPath)))
  ) {
    const source = _get(props, propPath.replace(/\.path$/, '.source'));

    return source === 'event' ? 'EVENT_PARAMS_PICKER' : 'OUTPUT_PATH_PICKER';
  } else if (
    isTodoFile &&
    ((typeName === 'VariableTodo' &&
      /^variables\..+\.initial\.source$/.test(propPath)) ||
      (typeName === 'FetchTodo' && /^data\.source$/.test(propPath)) ||
      (typeName === 'IterateTodo' && /^source\.source$/.test(propPath)) ||
      (typeName === 'ConditionBranchTodo' &&
        /^sources\[\d+\]\.source$/.test(propPath)) ||
      (typeName === 'SetStateTodo' &&
        /^states\[\d+\]\.source\.source$/.test(propPath)) ||
      (typeName === 'SetPropsTodo' &&
        /^props\[\d+\]\.source\.source$/.test(propPath)))
  ) {
    return 'VARIABLE_SOURCE';
  }

  return undefined;
};

export const useTodoOverride: Types.TodoOverrideHook =
  (todos, editedId, renderOverrideItem, override) =>
  (...args) => {
    const [, options] = args;
    const $override = renderOverrideItem?.(...args);

    if ($override || $override === false) {
      return $override;
    }

    return _get(override, getOverrideRenderType(...args) as string)?.(
      options,
      _get(todos, [editedId] as string[])
    );
  };
