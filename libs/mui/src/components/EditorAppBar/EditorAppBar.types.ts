import type { MouseEventHandler, ReactElement } from 'react';
import type { WidgetOptions } from '@appcraft/types';

import type { EditorProviderProps } from '../../contexts';

export interface EditorAppBarProps {
  fixedT?: EditorProviderProps['fixedT'];
  select: ReactElement;
  widget?: WidgetOptions;
  onBackToElements: MouseEventHandler<HTMLButtonElement>;
  onWidgetAdd: (id: string) => void;
  onWidgetSelect: (id: string) => void;

  onWidgetChange: <N extends keyof WidgetOptions>(
    name: N,
    value: WidgetOptions[N]
  ) => void;
}
