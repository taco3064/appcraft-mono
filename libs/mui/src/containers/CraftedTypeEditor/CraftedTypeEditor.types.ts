import type * as Appcraft from '@appcraft/types';

import type { EditorProviderProps, OptionValues } from '../../contexts';
import type { TypeListProps } from '../../components';

export type LazyTypeListProps<V extends OptionValues> = Omit<
  TypeListProps<V>,
  'collection'
> & {
  placeholder: string;
};

export interface CraftedTypeEditorProps<V extends OptionValues>
  extends Omit<EditorProviderProps<V>, 'children' | 'collectionPath'> {
  open?: boolean;
  parser: Appcraft.FetchOptions;
  onBack?: () => void;
}
