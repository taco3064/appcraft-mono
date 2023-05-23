import type * as Appcraft from '@appcraft/types';

export interface PureFieldProps {
  options:
    | Appcraft.BoolProp
    | Appcraft.InstanceOfProp
    | Appcraft.NumberProp
    | Appcraft.OneOfProp
    | Appcraft.StringProp;
}
