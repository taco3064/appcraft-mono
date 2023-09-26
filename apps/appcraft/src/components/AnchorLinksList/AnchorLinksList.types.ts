import type { GetWidgetOptionsFn } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

import type { BaseOption, Links, Navigation } from '~appcraft/hooks';

//* Variables
export type SearchParams = Navigation['links'][number]['searchParams'];

//* Component Props
export interface AnchorLinksListProps {
  layouts: LayoutWidget[];
  navid: string;
  pages: BaseOption[];
  value: Links;
  getWidgetOptions: GetWidgetOptionsFn;
  onChange: (value: Links) => void;
}
