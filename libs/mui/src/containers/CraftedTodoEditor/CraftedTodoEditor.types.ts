import type * as Appcraft from '@appcraft/types';

import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';
import type { TodoFlowControlsProps } from '../../components';
import type { TodoChangeHandler } from '../../hooks';

export interface CraftedTodoEditorProps
  extends Pick<TodoFlowControlsProps, 'disableCategories'>,
    Pick<
      CraftedTypeEditorProps<Appcraft.ConfigOptions>,
      'fixedT' | 'fullHeight' | 'open' | 'onBack' | 'onFetchDefinition'
    > {
  todoPath?: string;
  typeFile?: string;
  values?: Record<string, Appcraft.WidgetTodo>;
  onChange: TodoChangeHandler;
}
