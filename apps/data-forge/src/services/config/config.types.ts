import type * as Appcraft from '@appcraft/types';

export type OptionValues = Appcraft.ConfigOptions | Appcraft.NodeWidget;

export type ConfigData<
  C extends OptionValues,
  U = undefined
> = Appcraft.ConfigData<OptionValues, U>;
