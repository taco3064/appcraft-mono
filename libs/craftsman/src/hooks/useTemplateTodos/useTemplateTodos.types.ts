import type { FetchWrapperHandler } from '@appcraft/exhibitor';
import type { MainWidget } from '@appcraft/types';

import type { EditedState } from '../useStateOverride';

export type TemplateTodosHook = (
  widget: MainWidget,
  editedState: EditedState | undefined,
  onFetchWidgetWrapper: FetchWrapperHandler<'widget'>
) => string[];
