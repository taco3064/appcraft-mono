import { HandleProps } from 'reactflow';
import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

export interface TodoHandleProps extends HandleProps {
  className?: string;
  classes?: {
    root?: string;
  };
}

export type TodoIconProps = {
  variant: Appcraft.WidgetTodo['category'];
};

export interface TodoNodeLabelProps
  extends Pick<Appcraft.WidgetTodo, 'category'> {
  primary: ReactNode;
  secondary?: ReactNode;
  onDelete: () => void;

  classes?: {
    root?: string;
  };
}

export enum CategoryColor {
  variable = 'palette.info.main',
  wrap = 'palette.info.dark',
  fetch = 'palette.secondary.main',
  branch = 'palette.success.main',
  iterate = 'palette.success.dark',
  state = 'palette.warning.main',
  props = 'palette.warning.dark',
}
