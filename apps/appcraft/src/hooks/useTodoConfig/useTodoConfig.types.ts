import type { ChangeEventHandler } from 'react';
import type { ConfigData, ConfigOptions, WidgetTodo } from '@appcraft/types';

export type TodoVariant = WidgetTodo['category'];

export interface TodoConfigResult {
  variant: TodoVariant;
  todo: ConfigData<ConfigOptions>;
  refetch: () => void;
  onVariantChange: ChangeEventHandler<HTMLInputElement>;
}
