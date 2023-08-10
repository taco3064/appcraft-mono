import type { ReactNode } from 'react';
import type { WidgetTodo } from '@appcraft/types';

import type { RenderOverrideItemArgs, FixedT } from '../../contexts';
import type { TodoChangeHandler } from '../../hooks';

type BaseProps = RenderOverrideItemArgs<'display'>[1];

export interface TodoItemProps extends Omit<BaseProps, 'value'> {
  ct: FixedT;
  value?: Record<string, WidgetTodo>;

  renderTodoEditor: (options: {
    values: TodoItemProps['value'];
    onChange: TodoChangeHandler;
  }) => ReactNode;
}
