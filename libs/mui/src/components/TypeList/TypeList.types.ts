import type { BasicType } from '../../hooks';
import type { ChangeHandler, OptionValues } from '../../contexts';
import type { TypeItemProps } from '../TypeItem';

export interface TypeListProps<V extends OptionValues>
  extends Pick<TypeItemProps, 'disableSelection'> {
  superior: BasicType;
  values: V;
  onChange: ChangeHandler<V>;
  onCollectionPathChange: (collectionPath: string) => void;
}
