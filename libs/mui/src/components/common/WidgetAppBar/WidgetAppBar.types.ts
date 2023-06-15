import type { MouseEventHandler } from 'react';

export interface WidgetAppBarProps {
  description: string;
  onBackToStructure: MouseEventHandler<HTMLButtonElement>;
}
