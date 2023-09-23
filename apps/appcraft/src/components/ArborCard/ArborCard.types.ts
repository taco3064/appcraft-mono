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
  extends Pick<HierarchyData, 'type' | 'name' | 'description'> {
  id: string;
  mutation?: ReactNode;
  disableGroupChange?: boolean;
  icon: typeof SvgIcon;

  onActionRender?: () => JSX.Element;
  onClick: () => void;
}
