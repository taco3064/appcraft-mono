import Paper from '@mui/material/Paper';
import { LazyExoticComponent } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';
import type * as Appcraft from '@appcraft/types';

export interface TypesEditorProps
  extends Omit<Appcraft.TypesParseOptions, 'propPath'> {
  InputStyles?: Partial<Pick<TextFieldProps, 'color' | 'size' | 'variant'>>;
  parser: Pick<Appcraft.DataSource, 'url' | 'method' | 'headers'>;
}

export type LazyTypesDefHook = (
  options: Pick<TypesEditorProps, 'parser' | 'typeFile' | 'typeName'> & {
    propPath: string;
  }
) => [LazyExoticComponent<typeof Paper>, Appcraft.PropTypesDef | null];
