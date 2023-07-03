import type { StructureProp } from '@appcraft/types';
import type { ChangeHandler, OptionValues } from '../../contexts';

export interface TypeListProps<V extends OptionValues> {
  collection: StructureProp;
  values: V;
  onChange: ChangeHandler<V>;
  onCollectionPathChange: (collectionPath: string) => void;
}
