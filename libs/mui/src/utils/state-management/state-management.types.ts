import type * as Appcraft from '@appcraft/types';

//* Variables
export type StateCategory = Appcraft.WidgetState['category'];
export type StateGenerator = 'props' | 'todos' | 'node' | 'element';

//* Methods
export type GetStateTypeName = (state: Appcraft.WidgetState) => string;

export type GetStateCategory = (generator: StateGenerator) => StateCategory;

export type GetInitailState = (
  generator: StateGenerator,
  alias: string
) => Appcraft.WidgetState;

export type GetStateConfig = (
  typeFile: string,
  state: Appcraft.WidgetState
) => Appcraft.ConfigOptions;
