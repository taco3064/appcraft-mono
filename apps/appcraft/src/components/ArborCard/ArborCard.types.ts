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
export interface ArborCardProps {
  mutation?: ReactNode;
  data: HierarchyData<string>;
  disableGroupChange?: boolean;
  icon: typeof SvgIcon;

  onActionRender?: (data: HierarchyData<string>) => JSX.Element;
  onClick: (data: HierarchyData<string>) => void;
}
