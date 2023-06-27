import type { WidgetEvent, WidgetOptions } from '@appcraft/types';

export type Renderer = (child: WidgetOptions, index: number) => JSX.Element;

export type GetTodoEventHandleUtil = (
  options: WidgetEvent[]
) => (...args: unknown[]) => Promise<Record<string, unknown>>;
