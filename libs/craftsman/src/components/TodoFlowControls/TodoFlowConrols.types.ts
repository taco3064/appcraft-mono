import type * as Appcraft from '@appcraft/types';
import type { FixedT } from '../../contexts';

export enum ActionButton {
  state = 'btn-set-state',
  wrap = 'btn-todo-wrap',
  iterate = 'btn-add-iterate',
  branch = 'btn-add-condition',
  fetch = 'btn-fetch-data',
  variable = 'btn-create-variable',
}

export interface TodoFlowControlsProps {
  ct: FixedT;
  disableCategories?: Appcraft.WidgetTodo['category'][];
  onTodoAdd: (category: Appcraft.WidgetTodo['category']) => void;
}
