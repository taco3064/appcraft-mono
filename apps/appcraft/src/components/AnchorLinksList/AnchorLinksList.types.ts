import type { GetWidgetOptionsFn } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

import type { Links, Navigation } from '~appcraft/hooks';

//* Variables
export type SearchParams = Navigation['links'][number]['searchParams'];

//* Component Props
export interface AnchorLinksListProps {
  layouts: LayoutWidget[];
  pages: Navigation[];
  value: Navigation;
  getWidgetOptions: GetWidgetOptionsFn;
  onChange: (value: Links) => void;
}
