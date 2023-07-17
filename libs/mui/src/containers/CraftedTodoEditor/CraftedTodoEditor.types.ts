import type * as Appcraft from '@appcraft/types';

import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';
import type { TodoChangeHandler } from '../../hooks';

export interface CraftedTodoEditorProps
  extends Pick<
    CraftedTypeEditorProps<Appcraft.ConfigOptions>,
    'fixedT' | 'fullHeight' | 'open' | 'parser' | 'onBack'
  > {
  todoPath?: string;
  typeFile?: string;
  values?: Record<string, Appcraft.WidgetTodo>;
  onChange: TodoChangeHandler;
}
