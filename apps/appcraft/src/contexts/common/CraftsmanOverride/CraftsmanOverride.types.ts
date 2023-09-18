import type { MutableRefObject, ReactNode } from 'react';

import type * as Ctr from '~appcraft/containers/common';
import type * as Hook from '~appcraft/hooks/common';

export type CraftsmanOverrideContextValue = MutableRefObject<
  (options?: Hook.OverrideOptions) => Hook.OverrideHandlers
>;

export type CraftsmanOverrideContextHook = (
  options: Hook.OverrideOptions
) => Partial<Hook.OverrideHandlers>;

export interface CraftsmanOverrideProviderProps {
  children: ReactNode;
  hierarchyid?: string;
  onTodoView?: Ctr.TodoWrapperPickerProps['onView'];
  onWidgetView?: Ctr.WidgetPickerProps['onView'];
}
