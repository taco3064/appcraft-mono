import type * as Appcraft from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import type * as Hook from '../../hooks';
import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';
import type { TodoFlowControlsProps } from '../../components';

export interface CraftedTodoEditorProps
  extends Pick<TodoFlowControlsProps, 'disableCategories'>,
    Pick<
      CraftedTypeEditorProps<Appcraft.ConfigOptions>,
      'HeaderProps' | 'fullHeight' | 'renderOverrideItem' | 'onFetchDefinition'
    > {
  typeFile?: string;
  definition?: Appcraft.FuncProp;
  values?: Record<string, Appcraft.WidgetTodo>;
  variant?: 'normal' | 'popup';
  onChange: Hook.TodoChangeHandler;
  onEditToggle?: Hook.EditToggleHandler;
  onFetchData: Exhibitor.FetchDataHandler;
  onFetchTodoWrapper: Exhibitor.FetchWrapperHandler<'todo'>;
}
