import type * as Appcraft from '@appcraft/types';
import type { ChangeHandler } from '../../contexts';

export type ValuesState = {
  todo: Appcraft.WidgetTodo;
  config: Appcraft.ConfigOptions;
} | null;

export type TodoGeneratorHook = (typeFile: string) => [
  ValuesState,
  {
    cancel: () => void;
    change: ChangeHandler<Appcraft.ConfigOptions>;
    create: <T extends Appcraft.WidgetTodo>(category: T['category']) => void;
  }
];
