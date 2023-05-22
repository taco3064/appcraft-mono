import type * as Appcraft from '@appcraft/types';

import type { EditorProviderProps } from '../../contexts';
import type { TypeListProps } from '../TypeList';

export interface CraftedEditorProps<V extends object = object>
  extends Omit<Appcraft.TypesParseOptions, 'propPath'>,
    Omit<EditorProviderProps<V>, 'children' | 'propPath'>,
    Pick<TypeListProps, 'disableSelection'> {
  parser: Pick<Appcraft.DataSource, 'url' | 'method' | 'headers'>;
}
