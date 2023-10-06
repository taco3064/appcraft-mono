import type { ReactNode } from 'react';
import type { Website } from '@appcraft/types';

import type { BaseOption, NodePickerFn } from '~appcraft/hooks';

//* Component Props
export interface NavListProps {
  pageOptions: BaseOption[];
  title?: ReactNode;
  values?: Website['pages'];

  onChange: (values: Website['pages']) => void;
  onActionNodePick?: NodePickerFn<'add'>;
}
