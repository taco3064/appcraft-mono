import type { ReactNode } from 'react';
import type { Website } from '@appcraft/types';

import type { NavMutationButtonProps } from '../NavMutationButton';
import type { NodePickerFn } from '~appcraft/hooks';

//* Component Props
export interface NavListProps {
  pageOptions: NavMutationButtonProps['options'];
  title?: ReactNode;
  values?: Website['pages'];

  onChange: (values: Website['pages']) => void;
  onActionNodePick?: NodePickerFn<'add'>;
}
