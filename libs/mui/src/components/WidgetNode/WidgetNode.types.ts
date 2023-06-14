import type * as Appcraft from '@appcraft/types';
import type { FixedT } from '../../contexts';

export interface WidgetNodeProps<I extends Appcraft.WidgetOptions> {
  fixedT?: FixedT;
  item: I;
  structure: I extends Appcraft.NodeWidget
    ? Appcraft.WidgetChildren
    : undefined;

  onClick: (item: I) => void;
  onSelect: (type: Appcraft.NodeType, path: string) => void;
  onRemove: (item: I) => void;
}
