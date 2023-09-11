import type { MutableRefObject, ReactNode } from 'react';

import type * as Common from '../common';

export type CraftsmanOverrideContextValue = MutableRefObject<
  (options?: Common.OverrideOptions) => Common.OverrideHandlers
>;

export type CraftsmanOverrideContextHook = (
  options: Common.OverrideOptions
) => Partial<Common.OverrideHandlers>;

export interface CraftsmanOverrideProviderProps {
  children: ReactNode;
  hierarchyid?: string;
  onTodoView?: Common.TodoWrapperPickerProps['onView'];
  onWidgetView?: Common.WidgetPickerProps['onView'];
}
