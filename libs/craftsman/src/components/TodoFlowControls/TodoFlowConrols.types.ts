import type { WidgetTodo } from '@appcraft/types';

export enum ActionButton {
  state = 'btn-set-state',
  wrap = 'btn-todo-wrap',
  iterate = 'btn-add-iterate',
  branch = 'btn-add-condition',
  fetch = 'btn-fetch-data',
  variable = 'btn-create-variable',
}

export interface TodoFlowControlsProps {
  disableCategories?: WidgetTodo['category'][];
  onTodoAdd: (category: WidgetTodo['category']) => void;
}
