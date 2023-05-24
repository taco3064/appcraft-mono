import type { PropTypesDef } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { ToPathHandler, TypeItem } from '../../hooks';

export interface TypeItemProps {
  action?: ReactNode;
  disableSelection?: boolean;
  options: PropTypesDef;
  onDisplayItemClick: ToPathHandler;
  onItemRemove?: TypeItem['onItemRemove'];
}
