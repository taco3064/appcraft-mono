import type * as Appcraft from '@appcraft/types';
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

export type CraftedTypeEditorProps<
  A extends ActionElement,
  E extends Appcraft.NodeWidget | Appcraft.ConfigOptions
> = Collapsable<
  Omit<EditorProviderProps<E>, 'children' | 'collectionPath'> & {
    disableSelection?: boolean;
    parser: Pick<Appcraft.DataSource, 'url' | 'method' | 'headers'>;
  },
  A
>;
