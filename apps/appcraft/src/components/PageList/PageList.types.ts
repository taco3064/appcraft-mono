import type { Website } from '@appcraft/types';

import type { Page } from '../PageMutationMenu';
import type { PageMutationButtonProps } from '../PageMutationButton';
import type { NodePickerFn } from '~appcraft/hooks';

//* Variables
export type PageHierarchy = Pick<Page, 'id' | 'subTitle'> & { index: number };

//* Component Props
export interface PageListProps {
  pageOptions: PageMutationButtonProps['options'];
  values?: Website['pages'];

  onChange: (values: Website['pages']) => void;
  onActionNodePick?: NodePickerFn<'add'>;
}
