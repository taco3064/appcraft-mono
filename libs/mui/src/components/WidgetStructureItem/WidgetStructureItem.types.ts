import type * as Appcraft from '@appcraft/types';
import type { FixedT } from '../../contexts';

export interface WidgetStructureItemProps<I extends Appcraft.WidgetOptions> {
  fixedT?: FixedT;
  item: I;
  structure: I extends Appcraft.NodeWidget
    ? Appcraft.WidgetChildren
    : undefined;

  onClick: (item: I) => void;
  onRemove: (item: I) => void;
  onStructureSelect: (path: string) => void;
}
