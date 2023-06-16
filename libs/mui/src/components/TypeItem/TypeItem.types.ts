import type { PropTypesDef } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { PropPathRouterHandler, TypeItem } from '../../hooks';

export interface TypeItemProps
  extends Pick<TypeItem, 'collectionType' | 'onDelete'> {
  action?: ReactNode;
  disabled?: boolean;
  options: PropTypesDef;
  onSubitemView: PropPathRouterHandler;
}
