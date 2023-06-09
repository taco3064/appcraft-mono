import type { DataSource, TypesParseOptions } from '@appcraft/types';
import type { ReactElement } from 'react';

import type { EditorProviderProps } from '../../contexts';

export type ActionElement = ReactElement | undefined;

interface CollapsedAction<A extends ActionElement> {
  action: A;
  open: boolean;
}

export type Collapsable<
  P extends Record<string, unknown>,
  A extends ActionElement
> = P &
  (A extends undefined ? Partial<CollapsedAction<A>> : CollapsedAction<A>);

export type CraftedTypeEditorProps<A extends ActionElement> = Collapsable<
  Omit<TypesParseOptions, 'propPath' | 'mixedTypes'> &
    Omit<EditorProviderProps, 'children' | 'collectionPath'> & {
      disableSelection?: boolean;
      parser: Pick<DataSource, 'url' | 'method' | 'headers'>;
    },
  A
>;
