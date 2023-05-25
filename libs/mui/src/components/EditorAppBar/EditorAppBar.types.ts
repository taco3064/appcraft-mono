import type { MouseEventHandler, ReactElement } from 'react';
import type { WidgetOptions } from '@appcraft/types';

import type { EditorProviderProps } from '../../contexts';

export interface EditorAppBarProps {
  fixedT?: EditorProviderProps['fixedT'];
  select: ReactElement;
  widget?: WidgetOptions;
  onBackToElements: MouseEventHandler<HTMLButtonElement>;
  onElementAdd: (id: string) => void;

  onChange: <N extends keyof WidgetOptions>(
    name: N,
    value: WidgetOptions[N]
  ) => void;
}
