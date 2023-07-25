import type * as Appcraft from '@appcraft/types';

//* Variables
type WidgetState = Appcraft.RootNodeWidget['state'];
export type StateCategory = Appcraft.WidgetState['category'];
export type StateGenerator = 'props' | 'todos' | 'node' | 'element';

//* Methods
export type GetStateCategory = (generator: StateGenerator) => StateCategory;

export type GetInitailState = (
  generator: StateGenerator,
  alias: string
) => Appcraft.WidgetState;

export type GetStateConfig = <C extends StateCategory>(
  typeFile: string,
  category: C,
  state: WidgetState
) => Appcraft.ConfigOptions;
