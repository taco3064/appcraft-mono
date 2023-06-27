import type { BasicType } from '../../hooks';
import type { ChangeHandler, OptionValues } from '../../contexts';

export interface TypeListProps<V extends OptionValues> {
  collection: BasicType;
  values: V;
  onChange: ChangeHandler<V>;
  onCollectionPathChange: (collectionPath: string) => void;
}
