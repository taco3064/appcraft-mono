import type { PropTypesDef } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { PropPathRouterHandler, TypeItem } from '../../hooks';

export interface TypeItemProps extends Partial<Pick<TypeItem, 'onDelete'>> {
  action?: ReactNode;
  disableSelection?: boolean;
  options: PropTypesDef;
  onSubitemView: PropPathRouterHandler;
}
