import type * as Appcraft from '@appcraft/types';

import type { ChangeHandler } from '../../contexts';

export type StateValues = Appcraft.RootNodeWidget['state'];

export type EditingState = {
  path: string;
  config: Appcraft.ConfigOptions;
} | null;

export type StateGeneratorHook = <C extends Appcraft.StateCategory>(
  typeFile: string,
  category: C,
  widget: Appcraft.RootNodeWidget,
  onChange: (e: Appcraft.RootNodeWidget) => void
) => [
  EditingState,
  {
    clear: () => void;
    change: ChangeHandler<Appcraft.ConfigOptions>;
    edit: (path: string) => void;
    remove: (path: string) => void;
  }
];
