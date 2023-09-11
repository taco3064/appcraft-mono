import type * as Appcraft from '@appcraft/types';
import type { ComponentProps } from 'react';

import { AdornmentTextField } from '../../styles';
import type { FetchTypeDefinition } from '../../hooks';

//* Variables
export type MenuState = {
  open: boolean;
  path: string;
};

//* Methods
export type GetDefOptionsFn = (
  options: Appcraft.StructureProp | Appcraft.FuncProp
) => Appcraft.PropTypesDef[];

//* Component Props
export interface LazyAdornmentTextFieldProps
  extends ComponentProps<typeof AdornmentTextField> {
  superiorPath: string;
  onActive: (propName: string) => void;
}

export interface TodoInputSelectProps {
  disabled?: boolean;
  label: string;
  source: Appcraft.TypesParseOptions;
  value: string;
  onChange: (value: string) => void;
  onFetchDefinition: FetchTypeDefinition<
    Appcraft.StructureProp | Appcraft.FuncProp
  >;
}
