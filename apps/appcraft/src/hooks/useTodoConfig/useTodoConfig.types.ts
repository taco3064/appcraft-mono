import type { ChangeEventHandler } from 'react';
import type { ConfigData, ConfigOptions, TodoEvent } from '@appcraft/types';

export type TodoVariant = TodoEvent['category'];

export interface TodoConfigResult {
  variant: TodoVariant;
  todo: ConfigData<ConfigOptions>;
  refetch: () => void;
  onVariantChange: ChangeEventHandler<HTMLInputElement>;
}
