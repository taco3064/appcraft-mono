import type * as Appcraft from '@appcraft/types';
import type { FixedT } from '../../contexts';

export interface TodoFlowControlsProps {
  ct: FixedT;
  onTodoAdd: (category: Appcraft.WidgetTodo['category']) => void;
}
