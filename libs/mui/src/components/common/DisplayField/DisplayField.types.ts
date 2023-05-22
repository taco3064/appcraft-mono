import type * as Appcraft from '@appcraft/types';

export interface DisplayFieldProps {
  options:
    | Appcraft.ArrayOfProp
    | Appcraft.ExactProp
    | Appcraft.FuncProp
    | Appcraft.ObjectProp
    | Appcraft.ObjectOfProp;
}
