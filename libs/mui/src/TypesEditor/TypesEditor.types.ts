import List from '@mui/material/List';
import { LazyExoticComponent } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { InputStyles } from '../TypeFields';

export interface TypesEditorProps
  extends Omit<Appcraft.TypesParseOptions, 'propPath'> {
  InputStyles?: InputStyles;
  parser: Pick<Appcraft.DataSource, 'url' | 'method' | 'headers'>;
}

export type LazyTypesDefHook = (
  options: Pick<TypesEditorProps, 'parser' | 'typeFile' | 'typeName'> & {
    propPath: string;
  }
) => [LazyExoticComponent<typeof List>, Appcraft.PropTypesDef | null];
