import type { FetchWrapperHandler } from '@appcraft/exhibitor';
import type { RootNodeWidget } from '@appcraft/types';

import type { EditedState } from '../useStateOverride';

export type TemplateTodosHook = (
  widget: RootNodeWidget,
  editedState: EditedState | undefined,
  onFetchWidgetWrapper: FetchWrapperHandler<'widget'>
) => string[];
