import type { MutableRefObject } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { ChangeHandler } from '../../contexts';
import type { StateCategory } from '../../utils';

export type StateValues = Appcraft.RootNodeWidget['state'];
export type EditedState<C extends StateCategory> = Required<StateValues>[C];

export type StateGeneratorHook = <C extends StateCategory>(
  typeFile: string,
  category: C,
  state: StateValues
) => [
  {
    config: Appcraft.ConfigOptions;
    valuesRef: MutableRefObject<StateValues>;
  },
  {
    active: (e: StateCategory) => void;
    change: ChangeHandler<Appcraft.ConfigOptions>;
  }
];
