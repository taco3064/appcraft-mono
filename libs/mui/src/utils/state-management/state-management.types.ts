import type * as Appcraft from '@appcraft/types';

//* Variables
type WidgetState = Appcraft.RootNodeWidget['state'];
type StateCategory = Appcraft.WidgetState['category'];
export type StateGenerator = 'props' | 'todos' | 'node' | 'element';

export type EditingState<C extends StateCategory> = {
  state: WidgetState[C];
  config: Appcraft.ConfigOptions;
} | null;

//* Methods
export type GetStateCategory = (generator: StateGenerator) => StateCategory;

export type GetInitailState = (
  generator: StateGenerator,
  alias: string
) => Appcraft.WidgetState;

export type GetEditingState = <C extends StateCategory>(
  typeFile: string,
  category: C,
  state: WidgetState
) => EditingState<C>;
