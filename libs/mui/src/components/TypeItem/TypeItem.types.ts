import type { PropTypesDef } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { ToPathHandler } from '../../hooks';

export interface TypeItemProps {
  action?: ReactNode;
  disableSelection?: boolean;
  options: PropTypesDef;
  onDisplayItemClick: ToPathHandler;
  onItemRemove?: (options: PropTypesDef) => void;
}
