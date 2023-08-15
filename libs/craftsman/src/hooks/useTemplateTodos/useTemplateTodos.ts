import React from 'react';
import _get from 'lodash/get';

import type { TemplateTodosHook } from './useTemplateTodos.types';

const useTemplateTodos: TemplateTodosHook = (
  widget,
  editedState,
  onFetchWidgetWrapper
) => {
  const [, startTransition] = React.useTransition();
  const [todos, setTodos] = React.useState<string[]>([]);
  const { category, path } = editedState || {};
  const ref = React.useRef(onFetchWidgetWrapper);

  const templateId = _get(widget, [
    'state',
    category,
    path,
    'template',
    'id',
  ] as string[]);

  React.useImperativeHandle(ref, () => onFetchWidgetWrapper, [
    onFetchWidgetWrapper,
  ]);

  React.useEffect(() => {
    if (templateId) {
      startTransition(() => {
        (async () => {
          try {
            const { state } = await ref.current('widget', templateId);

            setTodos(
              Object.values(_get(state, ['todos']) || {}).map(
                ({ alias }) => alias
              )
            );
          } catch (e) {
            console.error(e);
            setTodos([]);
          }
        })();
      });
    }

    return () => setTodos([]);
  }, [templateId]);

  return todos;
};

export default useTemplateTodos;
