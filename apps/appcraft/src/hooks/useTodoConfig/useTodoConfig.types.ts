import type { ChangeEventHandler } from 'react';
import type { ConfigData, ConfigOptions, WidgetTodo } from '@appcraft/types';

export type TodoVariant = WidgetTodo['category'];

export type TodoConfigResult = [
  {
    variant: TodoVariant;
    todo: ConfigData<ConfigOptions>;
  },
  {
    refetch: () => void;
    variantChange: ChangeEventHandler<HTMLInputElement>;
  }
];
