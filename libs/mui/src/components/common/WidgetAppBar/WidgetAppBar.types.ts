import type { MouseEventHandler, ReactElement } from 'react';
import type { NodeWidget } from '@appcraft/types';

import type { ChangeHandler, EditorProviderProps } from '../../../contexts';

export interface WidgetAppBarProps {
  fixedT?: EditorProviderProps['fixedT'];
  widget: Partial<NodeWidget>;
  widgetTypeSelection: ReactElement;
  onBackToElements: MouseEventHandler<HTMLButtonElement>;
  onWidgetChange: ChangeHandler<keyof NodeWidget>;
}
