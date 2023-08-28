import type { WidgetTodo } from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import type { TodoEdge } from '../../utils';

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
  edges: TodoEdge[];
  todos: Record<string, WidgetTodo>;
  todoid: string;
  disabled?: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFetchData: Exhibitor.FetchDataHandler;
  onFetchTodoWrapper: Exhibitor.FetchTodoWrapperHandler;
}
