import type * as Appcraft from '@appcraft/types';

//* Variables
type StateRecord = Required<Appcraft.RootNodeWidget>['state'];
export type StateCategory = Appcraft.WidgetState['category'];
export type StateGenerator = 'props' | 'todos' | 'node' | 'element';

//* Private
export type GetStateTypeName = (state: Appcraft.WidgetState) => string;

export type Convert2StateArray = (
  state: Required<StateRecord>[StateCategory],
  basePath: string
) => Appcraft.WidgetState[];

export type Convert2State = (
  arr: Appcraft.WidgetState[],
  basePath: string,
  state: Required<StateRecord>[StateCategory]
) => Required<StateRecord>[StateCategory];

//* Methods
export type GetStateCategory = (generator: StateGenerator) => StateCategory;

export type GetInitailState = (
  generator: StateGenerator,
  alias: string
) => Appcraft.WidgetState;

export type GetStateConfig = (
  typeFile: string,
  state: Appcraft.WidgetState
) => Appcraft.ConfigOptions;

export type RemoveState = (
  category: StateCategory,
  state: StateRecord,
  basePath: string,
  index: number
) => StateRecord;

export type ResortState = (
  category: StateCategory,
  state: StateRecord,
  basePath: string,
  indexes: [number, number]
) => StateRecord;
