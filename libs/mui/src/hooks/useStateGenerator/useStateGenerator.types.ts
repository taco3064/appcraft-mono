import type * as Appcraft from '@appcraft/types';

import type { ChangeHandler } from '../../contexts';
import type { StateCategory } from '../../utils';

export type StateValues = Appcraft.RootNodeWidget['state'];

export type EditingState = {
  path: string;
  config: Appcraft.ConfigOptions;
} | null;

export type StateGeneratorHook = <C extends StateCategory>(
  typeFile: string,
  category: C,
  state?: StateValues
) => [
  {
    editing: EditingState;
    stateValues: StateValues;
  },
  {
    clear: () => void;
    change: ChangeHandler<Appcraft.ConfigOptions>;
    edit: (path: string) => void;
    remove: (path: string) => void;
  }
];
