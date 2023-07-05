import type { WidgetTodo } from '@appcraft/types';
import type { FixedT } from '../../contexts';

export interface TodoFlowControlsProps {
  ct: FixedT;
  onTodoAppend: (todo: WidgetTodo) => void;
}
