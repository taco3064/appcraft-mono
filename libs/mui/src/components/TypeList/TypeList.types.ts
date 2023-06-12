import type { ConfigOptions, NodeWidget } from '@appcraft/types';

import type { BasicType } from '../../hooks';
import type { ChangeHandler } from '../../contexts';
import type { TypeItemProps } from '../TypeItem';

export interface TypeListProps<V extends ConfigOptions | NodeWidget>
  extends Pick<TypeItemProps, 'disableSelection'> {
  superior: BasicType;
  values: V;
  onChange: ChangeHandler<V>;
  onCollectionPathChange: (collectionPath: string) => void;
}
