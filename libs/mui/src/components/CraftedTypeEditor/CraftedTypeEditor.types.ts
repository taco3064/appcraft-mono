import type * as Appcraft from '@appcraft/types';
import type { ReactElement } from 'react';

import type { EditorProviderProps, OptionValues } from '../../contexts';
import type { TypeListProps } from '../TypeList';

export type ActionElement = ReactElement | undefined;

interface CollapsedAction<A extends ActionElement> {
  action: A;
  open: boolean;
}

export type LazyTypeListProps<V extends OptionValues> = Omit<
  TypeListProps<V>,
  'collection'
> & {
  message: string;
};

type Collapsable<P, A extends ActionElement> = P &
  (A extends undefined ? Partial<CollapsedAction<A>> : CollapsedAction<A>);

export type CraftedTypeEditorProps<
  V extends OptionValues,
  A extends ActionElement
> = Collapsable<
  Omit<EditorProviderProps<V>, 'children' | 'collectionPath'> & {
    parser: Appcraft.FetchOptions;
    version?: string;
  },
  A
>;
