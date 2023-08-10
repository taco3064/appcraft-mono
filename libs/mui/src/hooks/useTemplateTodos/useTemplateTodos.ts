import _get from 'lodash/get';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import type { TemplateTodosHook } from './useTemplateTodos.types';

const useTemplateTodos: TemplateTodosHook = (
  widget,
  editedState,
  onFetchWidgetWrapper
) => {
  const [todos, setTodos] = useState<string[]>([]);
  const { category, path } = editedState || {};
  const ref = useRef(onFetchWidgetWrapper);

  const templateId = _get(widget, [
    'state',
    category,
    path,
    'template',
    'id',
  ] as string[]);

  useImperativeHandle(ref, () => onFetchWidgetWrapper, [onFetchWidgetWrapper]);

  useEffect(() => {
    if (templateId) {
      ref
        .current('widget', templateId)
        .then(({ state }) =>
          setTodos(
            Object.values(_get(state, ['todos']) || {}).map(
              ({ alias }) => alias
            )
          )
        );
    }
  }, [templateId]);

  return todos;
};

export default useTemplateTodos;
