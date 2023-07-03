import type { ChangeHandler, OptionValues } from '../../contexts';
import type { StructureType } from '../../services';

export interface TypeListProps<V extends OptionValues> {
  collection: StructureType;
  values: V;
  onChange: ChangeHandler<V>;
  onCollectionPathChange: (collectionPath: string) => void;
}
