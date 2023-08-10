import type { ReactNode } from 'react';
import type { WidgetTodo } from '@appcraft/types';

import type { RenderOverrideItemArgs, FixedT } from '../../contexts';
import type * as Hook from '../../hooks';

type BaseProps = RenderOverrideItemArgs<'display'>[1];

export interface TodoItemProps extends Omit<BaseProps, 'value'> {
  ct: FixedT;
  editedState?: Hook.EditedState;
  value?: Record<string, WidgetTodo>;

  renderTodoEditor: (options: {
    values: TodoItemProps['value'];
    onChange: Hook.TodoChangeHandler;
    onEditToggle: Hook.EditToggleHandler;
  }) => ReactNode;
}
