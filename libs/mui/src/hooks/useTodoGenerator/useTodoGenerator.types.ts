import type * as Appcraft from '@appcraft/types';

export type TodoGeneratorHook = (typeFile: string) => [
  {
    config: Appcraft.ConfigOptions | null;
    todo: Appcraft.WidgetTodo | null;
  },
  {
    cancel: () => void;
    create: <T extends Appcraft.WidgetTodo>(category: T['category']) => void;
  }
];
