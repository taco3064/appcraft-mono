import type * as Craftsman from '@appcraft/craftsman';
import type { ReactNode } from 'react';
import type { WidgetTodo } from '@appcraft/types';

type BaseProps = Craftsman.RenderOverrideItemArgs<'display'>[1];

export interface TodoItemProps extends Omit<BaseProps, 'value'> {
  value?: Record<string, WidgetTodo>;

  renderTodoEditor: (options: {
    values: TodoItemProps['value'];
    onChange: Craftsman.CraftedTodoEditorProps['onChange'];
    onEditToggle: Craftsman.EditToggleHandler;
  }) => ReactNode;
}
