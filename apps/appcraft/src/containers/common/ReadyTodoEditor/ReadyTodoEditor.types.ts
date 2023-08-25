import type { CraftedWidgetEditorProps } from '@appcraft/craftsman';

import type { PageData } from '~appcraft/hooks';
import type { TodoWrapperSelectProps } from '../TodoWrapperSelect';

//* Variables
type ReadyTodo = PageData['readyTodos'];
type OverrideRenderType = 'TODO_PICKER';

//* Methods
export type GetOverrideRenderType = (
  ...args: Parameters<CraftedWidgetEditorProps['renderOverrideItem']>
) => OverrideRenderType | void;

//* Component Props
export interface ReadyTodoEditorProps {
  value?: ReadyTodo;
  onConfirm: (value: ReadyTodo) => void;
  onTodoWrapperView?: TodoWrapperSelectProps['onView'];
}
