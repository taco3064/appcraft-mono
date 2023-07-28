import type { ConfigData, WidgetTodo } from '@appcraft/types';
import type { CraftedTodoEditorProps, OutputData } from '@appcraft/mui';

export type TodoValuesHook = (options: {
  data: ConfigData<Record<string, WidgetTodo>, string>;
  onSave?: () => void;
  onOpen: () => void;
}) => [
  {
    duration: number;
    outputs: OutputData[][];
    todos: Record<string, WidgetTodo>;
  },
  {
    change: CraftedTodoEditorProps['onChange'];
    run: () => void;
    reset: () => void;
    save: () => void;
  }
];
