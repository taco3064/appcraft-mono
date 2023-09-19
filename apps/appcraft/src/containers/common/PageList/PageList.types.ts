import type { Website } from '@appcraft/types';

//* Variables
type Page = Website['pages'][number];

export type PageHierarchy = Pick<Page, 'id' | 'subTitle'>;

//* Component Props
export interface PageListProps {
  values?: Website['pages'];
  onChange: (values: Website['pages']) => void;
}
