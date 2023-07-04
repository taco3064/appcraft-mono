import type * as Appcraft from '@appcraft/types';
import type { ChangeHandler, FixedT } from '../../contexts';

export interface CraftedTodoEditorProps {
  fixedT?: FixedT;
  fullHeight?: boolean;
  open?: boolean;
  todoPath?: string;
  values?: Appcraft.NodeWidget;
  onBack?: () => void;
  onChange: ChangeHandler<Appcraft.NodeWidget>;
}
