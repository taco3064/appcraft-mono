import type * as Appcraft from '@appcraft/types';

import type { ChangeHandler } from '../../contexts';
import type { EditingState } from '../../utils';

export type StateGeneratorHook = <C extends Appcraft.WidgetState['category']>(
  typeFile: string,
  category: C,
  state: Appcraft.RootNodeWidget['state']
) => [
  EditingState<C>,
  {
    change: ChangeHandler<Appcraft.ConfigOptions>;
  }
];
