import type { FetchWrapperHandler } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

export interface CraftedLayoutEditorProps {
  layout: LayoutWidget;
  onFetchWidgetWrapper: FetchWrapperHandler<'widget'>;
  onLayoutChange: (e: LayoutWidget) => void;
}
