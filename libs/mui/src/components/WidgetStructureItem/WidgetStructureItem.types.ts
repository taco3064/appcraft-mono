import type {
  NodeWidget,
  WidgetOptions,
  WidgetChildren,
} from '@appcraft/types';

import type { FixedT } from '../../contexts';
import path from 'path';

export interface WidgetStructureItemProps<I extends WidgetOptions> {
  fixedT?: FixedT;
  item: I;
  structure: I extends NodeWidget ? WidgetChildren : undefined;
  onClick: (item: I) => void;
  onRemove: (item: I) => void;
  onStructureSelect: (path: string) => void;
}
