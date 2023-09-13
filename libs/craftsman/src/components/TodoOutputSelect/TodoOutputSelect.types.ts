import type { MainWidget, WidgetTodo } from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import { getTodosInfo } from '../../utils';

//* Variables
export type OutputOption = {
  value: string;
  description: string;
};

//* Methods
export type GetOutputOptions = (
  todos: Record<string, WidgetTodo>,
  outputs: Exhibitor.OutputData[]
) => OutputOption[];

//* Component Props
export interface TodoOutputSelectProps {
  TodoProps: ReturnType<typeof getTodosInfo> & {
    id: string;
  };

  defaultTodos?: Record<string, WidgetTodo>;
  disabled?: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFetchData: Exhibitor.FetchDataHandler;
  onFetchTodoWrapper: Exhibitor.FetchWrapperHandler<'todo'>;
}
