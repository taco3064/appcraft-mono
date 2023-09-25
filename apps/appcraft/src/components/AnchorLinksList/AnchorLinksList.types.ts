import type { GetWidgetOptionsFn } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

export interface AnchorLinksListProps {
  layouts: LayoutWidget[];
  getWidgetOptions: GetWidgetOptionsFn;
}
