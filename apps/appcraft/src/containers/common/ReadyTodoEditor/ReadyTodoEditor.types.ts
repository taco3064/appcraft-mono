import type { CraftedWidgetEditorProps } from '@appcraft/craftsman';

import type { PageData } from '~appcraft/hooks';
import type { TodoWrapperSelectProps } from '../TodoWrapperSelect';
import type { WidgetSelectProps } from '../WidgetSelect';

//* Variables
type ReadyTodo = PageData['readyTodos'];
type OverrideRenderType = 'TODO_PICKER' | 'PROPS_WIDGET' | 'PROPS_PICKER';

//* Methods
export type GetOverrideRenderType = (
  ...args: Parameters<CraftedWidgetEditorProps['renderOverrideItem']>
) => OverrideRenderType | void;

//* Component Props
export interface ReadyTodoEditorProps {
  layouts: PageData['layouts'];
  value?: ReadyTodo;
  onConfirm: (value: ReadyTodo) => void;
  onTodoWrapperView?: TodoWrapperSelectProps['onView'];
  onWidgetWrapperView?: WidgetSelectProps['onView'];
}
