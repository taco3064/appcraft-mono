import type { Website } from '@appcraft/types';
import type { NodePickerFn } from '~appcraft/hooks/common';

//* Variables
type Page = Website['pages'][number];

export type PageHierarchy = Pick<Page, 'id' | 'subTitle'>;

//* Component Props
export interface PageListProps {
  values?: Website['pages'];

  onChange: (values: Website['pages']) => void;
  onActionNodePick?: NodePickerFn<'add'>;
}
