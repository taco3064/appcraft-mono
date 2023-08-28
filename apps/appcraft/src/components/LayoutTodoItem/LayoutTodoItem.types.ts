import type { TodosState } from '@appcraft/types';

export interface LayoutTodoItemProps {
  state: TodosState;
  onChange: (value: unknown) => void;
}
