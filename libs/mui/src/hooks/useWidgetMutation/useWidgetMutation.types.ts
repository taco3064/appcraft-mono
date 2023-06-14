import type * as Appcraft from '@appcraft/types';
import type { ChangeHandler } from '../../contexts';

export type WidgetMutationHook = (
  widget: Appcraft.NodeWidget,
  isMultiChildren: boolean,
  paths: undefined | (string | number)[],
  onWidgetChange: ChangeHandler<Appcraft.NodeWidget>
) => {
  onWidgetAdd: (e: Appcraft.NodeWidget) => void;
  onWidgetRemove: (e: Appcraft.WidgetOptions) => void;
};
