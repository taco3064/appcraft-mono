import type { NodeWidget } from '@appcraft/types';

import type { BasicType } from '../../hooks';
import type { ChangeHandler } from '../../contexts';
import type { TypeItemProps } from '../TypeItem';

export interface TypeListProps extends Pick<TypeItemProps, 'disableSelection'> {
  superior: BasicType;
  values: NodeWidget;
  onChange: ChangeHandler;
  onCollectionPathChange: (collectionPath: string) => void;
}
