import SvgIcon from '@mui/material/SvgIcon';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';

import type { HierarchyData } from '~appcraft/services';

//* Variables
export type DndHook = {
  group: ReturnType<typeof useDroppable>;
  item: ReturnType<typeof useDraggable>;
};

//* Component Props
export interface ArborCardProps
  extends Pick<HierarchyData, 'type' | 'description'> {
  disableGroupChange?: boolean;
  enableItemDroppable?: boolean;
  icon: typeof SvgIcon;
  id: string;
  mutation?: ReactNode;
  title: ReactNode;

  onActionRender?: () => JSX.Element;
  onClick: () => void;
}
