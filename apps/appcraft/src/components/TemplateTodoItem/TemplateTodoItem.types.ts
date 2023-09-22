import type * as Craftsman from '@appcraft/craftsman';
import type { WidgetTodo } from '@appcraft/types';

type BaseProps = Craftsman.RenderOverrideItemArgs<'display'>[1];

export interface TemplateTodoItemProps extends Omit<BaseProps, 'value'> {
  CraftedTodoEditorProps?: Partial<Craftsman.CraftedTodoEditorProps>;
  value?: Record<string, WidgetTodo>;
}
