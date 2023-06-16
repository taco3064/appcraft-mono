import type { BasicType } from '../../hooks';
import type { ChangeHandler, OptionValues } from '../../contexts';

export interface TypeListProps<V extends OptionValues> {
  superior: BasicType;
  values: V;
  onChange: ChangeHandler<V>;
  onCollectionPathChange: (collectionPath: string) => void;
}
