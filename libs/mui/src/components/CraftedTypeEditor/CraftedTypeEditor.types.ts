import type * as Appcraft from '@appcraft/types';
import type { ReactElement } from 'react';

import type { EditorProviderProps } from '../../contexts';
import type { TypeListProps } from '../TypeList';

export type ActionElement = ReactElement | undefined;

interface CollapsedAction<A extends ActionElement> {
  action: A;
  open: boolean;
}

export type LazyTypeListProps<
  E extends Appcraft.NodeWidget | Appcraft.ConfigOptions
> = Omit<TypeListProps<E>, 'superior'> & {
  message: string;
};

export type Collapsable<
  P extends Record<string, unknown>,
  A extends ActionElement
> = P &
  (A extends undefined ? Partial<CollapsedAction<A>> : CollapsedAction<A>);

export type CraftedTypeEditorProps<
  E extends Appcraft.NodeWidget | Appcraft.ConfigOptions,
  A extends ActionElement
> = Collapsable<
  Omit<EditorProviderProps<E>, 'children' | 'collectionPath'> & {
    disableSelection?: boolean;
    parser: Appcraft.FetchOptions;
  },
  A
>;
