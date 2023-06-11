import type * as Appcraft from '@appcraft/types';

export type TypeItemPureProps = Appcraft.BaseField<
  | Appcraft.BoolProp
  | Appcraft.InstanceOfProp
  | Appcraft.NumberProp
  | Appcraft.OneOfProp
  | Appcraft.StringProp
>;
