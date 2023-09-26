import type { WidgetTodo } from '@appcraft/types';

//* @WidgetTodo - 此處條列之順序等同畫面顯示
export enum ActionButton {
  search = 'btn-search-params',
  props = 'btn-set-props',
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
