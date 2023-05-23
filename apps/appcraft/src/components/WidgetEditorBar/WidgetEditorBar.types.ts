import type { ReactNode, MouseEventHandler } from 'react';
import type { WidgetOptions } from '@appcraft/types';

export interface WidgetEditorBarProps {
  action?: ReactNode;
  widget?: WidgetOptions;
  onBackToElements: MouseEventHandler<HTMLButtonElement>;
  onElementAdd: (id: string) => void;
  onValueChange: (name: 'type' | 'description', value: string) => void;
}
