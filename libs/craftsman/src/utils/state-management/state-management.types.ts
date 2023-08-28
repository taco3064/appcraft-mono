import type * as Appcraft from '@appcraft/types';

//* Variables
type StateRecord = Required<Appcraft.MainWidget>['state'];
export type StateGenerator = 'props' | 'todos' | 'node' | 'element';

//* Private
export type GetStateTypeName = (state: Appcraft.WidgetState) => string;

export type Convert2StateArray = (
  state: Required<StateRecord>[Appcraft.StateCategory],
  basePath: string,
  length: number
) => Appcraft.WidgetState[];

export type Convert2State = (
  arr: Appcraft.WidgetState[],
  basePath: string,
  state: Required<StateRecord>[Appcraft.StateCategory]
) => Required<StateRecord>[Appcraft.StateCategory];

//* Methods
export type GetStateCategory = (
  generator: StateGenerator
) => Appcraft.StateCategory;

export type GetInitailState = (
  generator: StateGenerator,
  alias: string,
  options?: Appcraft.PropTypesDef
) => Appcraft.WidgetState;

export type GetStateConfig = (
  typeFile: string,
  state: Appcraft.WidgetState
) => Appcraft.ConfigOptions;

export type RemoveState = (
  category: Appcraft.StateCategory,
  state: StateRecord,
  basePath: string,
  index: number,
  length: number
) => StateRecord;

export type ResortState = (
  state: StateRecord,
  basePath: string,
  indexes: [number, number],
  length: number
) => StateRecord;
