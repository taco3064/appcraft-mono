import type { BasicType } from '../../hooks';
import type { EditorProviderProps } from '../../contexts';
import type { TypeItemProps } from '../TypeItem';

export interface TypeListProps
  extends Pick<TypeItemProps, 'disableSelection'>,
    Pick<
      EditorProviderProps,
      'mixedTypes' | 'values' | 'onChange' | 'onMixedTypeMapping'
    > {
  superior: BasicType;
  onCollectionPathChange: (collectionPath: string) => void;
}
