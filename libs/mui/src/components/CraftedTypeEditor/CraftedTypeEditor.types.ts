import type { DataSource, TypesParseOptions } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { EditorProviderProps } from '../../contexts';

export interface CraftedTypeEditorProps
  extends Omit<TypesParseOptions, 'propPath'>,
    Omit<EditorProviderProps, 'children' | 'collectionPath'> {
  disableSelection?: boolean;
  action?: ReactNode;
  parser: Pick<DataSource, 'url' | 'method' | 'headers'>;
}
