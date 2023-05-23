import type * as Appcraft from '@appcraft/types';

export type BasicType =
  | Appcraft.ArrayOfProp
  | Appcraft.ExactProp
  | Appcraft.ObjectOfProp
  | Appcraft.ObjectProp;

export type PropertiesSortingHook = (
  basicType?: BasicType
) => Appcraft.PropTypesDef[];
