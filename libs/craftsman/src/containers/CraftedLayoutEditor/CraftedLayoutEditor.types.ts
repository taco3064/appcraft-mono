import type { FetchWrapperHandler } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

export interface CraftedLayoutEditorProps {
  layouts: LayoutWidget[];
  onFetchWidgetWrapper: FetchWrapperHandler<'widget'>;
  onLayoutsChange: (e: LayoutWidget[]) => void;
}
