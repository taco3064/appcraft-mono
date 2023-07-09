import type * as Appcraft from '@appcraft/types';
import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';

export interface CraftedTodoEditorProps
  extends Pick<
    CraftedTypeEditorProps<Appcraft.ConfigOptions>,
    'fixedT' | 'fullHeight' | 'open' | 'parser' | 'onBack'
  > {
  todoPath?: string;
  typeFile?: string;
  values?: Record<string, Appcraft.WidgetTodo>;
  onChange: (values: Record<string, Appcraft.WidgetTodo>) => void;
}
