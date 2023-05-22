import { ComponentType, LazyExoticComponent } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { InteractivedProviderProps } from '../InteractivedContext';
import type { TypeListProps } from '../TypeList';

export interface CraftedEditorProps<V extends object = object>
  extends Omit<Appcraft.TypesParseOptions, 'propPath'>,
    Omit<InteractivedProviderProps<V>, 'children' | 'propPath'>,
    Pick<TypeListProps, 'disableSelection'> {
  parser: Pick<Appcraft.DataSource, 'url' | 'method' | 'headers'>;
}

export type LazyTypeListHook = (
  options: Pick<
    CraftedEditorProps,
    'parser' | 'typeFile' | 'typeName' | 'mixedTypes'
  > & {
    propPath: string;
  }
) => LazyExoticComponent<ComponentType<Omit<TypeListProps, 'superior'>>>;
