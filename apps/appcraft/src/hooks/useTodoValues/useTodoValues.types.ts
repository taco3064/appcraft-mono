import type { ConfigData, WidgetTodo } from '@appcraft/types';
import type { CraftedTodoEditorProps } from '@appcraft/mui';

export type TodoValuesHook = (options: {
  data: ConfigData<Record<string, WidgetTodo>, string>;
  onSave?: () => void;
}) => [
  Record<string, WidgetTodo>,
  {
    change: CraftedTodoEditorProps['onChange'];
    run: () => void;
    reset: () => void;
    save: () => void;
  }
];
