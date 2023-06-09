import type { NodeWidget } from '@appcraft/types';
import type { ChangeEventHandler } from 'react';

import type { ActionElement, Collapsable } from '../CraftedTypeEditor';
import type { ChangeHandler, EditorProviderProps } from '../../contexts';

export type WidgetStructureProps<A extends ActionElement> = Collapsable<
  {
    fixedT?: EditorProviderProps['fixedT'];
    widget?: NodeWidget;
    onWidgetChange: ChangeHandler<keyof NodeWidget>;
    onWidgetSelect: (widget: NodeWidget) => void;

    renderWidgetTypeSelection: (
      defaultValue: string,
      onChange: ChangeEventHandler<HTMLInputElement>
    ) => JSX.Element;
  },
  A
>;
