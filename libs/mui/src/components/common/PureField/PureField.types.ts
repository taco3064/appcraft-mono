import type * as Appcraft from '@appcraft/types';

export type PureFieldProps = Appcraft.BaseField<
  | Appcraft.BoolProp
  | Appcraft.InstanceOfProp
  | Appcraft.NumberProp
  | Appcraft.OneOfProp
  | Appcraft.StringProp
>;
