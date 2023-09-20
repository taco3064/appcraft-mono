import type { CraftedRendererProps } from '@appcraft/exhibitor';

import type { HierarchyData } from '~appcraft/services';
import type { OverrideRender } from '~appcraft/contexts';
import type { TodoWrapperPickerProps } from './TodoWrapperPicker';
import type { WidgetPickerProps } from './WidgetPicker';

//* Methods
export type WidgetViewHandler = (data: HierarchyData<string>) => void;

export type GetOverrideRenderFn = (handles: {
  onFetchData: CraftedRendererProps['onFetchData'];
  onFetchWrapper: CraftedRendererProps['onFetchWrapper'];
  onTodoView?: TodoWrapperPickerProps['onView'];
  onWidgetView?: WidgetPickerProps['onView'];
}) => OverrideRender;
