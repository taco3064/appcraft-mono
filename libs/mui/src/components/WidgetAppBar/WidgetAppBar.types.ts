import type { MouseEventHandler } from 'react';
import type { FixedT } from '../../contexts';

export interface WidgetAppBarProps {
  ct: FixedT;
  description?: string;
  type: 'props' | 'events';
  onBackToStructure: MouseEventHandler<HTMLButtonElement>;
}
