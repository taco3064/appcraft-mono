import type * as Appcraft from '@appcraft/types';
import type { FixedT } from '../../contexts';

export interface WidgetNodeProps<I extends Appcraft.WidgetOptions> {
  fixedT?: FixedT;
  item: I;
  structure: I extends Appcraft.NodeWidget ? Appcraft.ChildNodes : undefined;

  onClick: (item: I) => void;
  onActive: (type: Appcraft.NodeType, path: string) => void;
  onRemove: (item: I) => void;
}
