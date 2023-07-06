import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import type { FixedT, ChangeHandler } from '../../contexts';

export interface TodoFlowControlsProps {
  ct: FixedT;
  typeFile?: string;
  onTodoAppend: (todo: Appcraft.WidgetTodo) => void;

  renderEditor: (
    todoConfig: Appcraft.ConfigOptions,
    onChange: ChangeHandler<Appcraft.ConfigOptions>
  ) => ReactNode;
}
