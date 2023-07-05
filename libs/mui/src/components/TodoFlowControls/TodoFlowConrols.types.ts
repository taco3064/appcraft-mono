import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import type { FixedT } from '../../contexts';

export interface TodoFlowControlsProps {
  ct: FixedT;
  renderEditor: (todoConfig: Appcraft.ConfigOptions) => ReactNode;
  typeFile: string;
  onTodoAppend: (todo: Appcraft.WidgetTodo) => void;
}
