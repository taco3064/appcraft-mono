import type * as Appcraft from '@appcraft/types';

import type { EditedState } from '../useStateOverride';
import type { FetchWrapperHandler } from '../useRender';

export type TemplateTodosHook = (
  widget: Appcraft.RootNodeWidget,
  editedState: EditedState | undefined,
  onFetchWidgetWrapper: FetchWrapperHandler<'widget'>
) => string[];
