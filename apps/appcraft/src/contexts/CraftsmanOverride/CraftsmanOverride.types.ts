import type { MainWidget } from '@appcraft/types';
import type { MutableRefObject, ReactNode } from 'react';

import type * as Common from '../common';

export type CraftsmanOverrideContextValue = MutableRefObject<
  (widget: MainWidget) => Common.OverrideHandlers
>;

export type CraftsmanOverrideContextHook = (
  widget: MainWidget
) => Partial<Common.OverrideHandlers>;

export interface CraftsmanOverrideProviderProps {
  children: ReactNode;
  hierarchyid: string;
  onTodoView?: Common.TodoWrapperPickerProps['onView'];
  onWidgetView?: Common.WidgetPickerProps['onView'];
}
