import type * as Appcraft from '@appcraft/types';

//* Variables
export type ExecuteRecord = {
  event: unknown[];
  output: Record<string, unknown>;
};

export type ExecuteArgs = [
  Appcraft.WidgetTodo,
  {
    todos: Record<string, Appcraft.WidgetTodo>;
    record: ExecuteRecord;
  }
];

export type GetVariableArgs = [
  Appcraft.Variables,
  ExecuteRecord,
  string | undefined
];

//* Private
export type GetVariable = (
  variable: Appcraft.Variables,
  record: ExecuteRecord,
  mixedType?: string
) => unknown;

//* Methods
export type GetEventHandler = (
  options: Record<string, Appcraft.WidgetTodo>
) => (...event: unknown[]) => Promise<void>;
