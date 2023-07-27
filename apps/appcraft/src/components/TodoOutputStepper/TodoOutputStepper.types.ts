import type { OutputData } from '@appcraft/mui';
import type { ReactNode } from 'react';
import type { WidgetTodo } from '@appcraft/types';

export interface TodoOutputStepperProps {
  fullHeight?: boolean;
  title?: ReactNode;
  duration: number;
  logs: OutputData[][];
  todos: Record<string, WidgetTodo>;
}
