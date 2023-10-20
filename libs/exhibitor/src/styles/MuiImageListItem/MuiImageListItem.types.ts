import type * as React from 'react';
import type { Breakpoint } from '@mui/material/styles';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { ImageListItemProps } from '@mui/material/ImageListItem';
import type { LayoutWidget } from '@appcraft/types';
import type { PaperProps } from '@mui/material/Paper';

import { ResizeHandle } from '../MuiSvgIcon';

type Layout = LayoutWidget['layout']['xs'];

//* Component Props
export interface CollectionContentProps {
  PaperProps?: Omit<PaperProps, 'classes' | 'className' | 'elevation'>;
  action?: React.ReactNode;
  children?: React.ReactNode;
  elevation?: PaperProps['elevation'];

  resortDragHandle?: Exclude<React.ReactElement, string>;

  classes?: {
    root?: string;
    action?: string;
  };
}

export interface CollectionItemProps
  extends Omit<
    ImageListItemProps,
    'classes' | 'hidden' | 'id' | 'cols' | 'rows'
  > {
  PaperProps?: Omit<PaperProps, 'classes' | 'className' | 'elevation'>;
  action?: React.ReactNode;
  breakpoint: Breakpoint;
  children?: React.ReactNode;
  elevation?: PaperProps['elevation'];
  id: string;
  layouts: LayoutWidget['layout'];

  classes?: Partial<
    Record<
      'root' | 'paper' | 'action' | Exclude<Layout['hidden'], false>,
      string
    >
  >;

  DragHandle?: {
    resize?: React.ReactElement<
      Omit<React.ComponentProps<typeof ResizeHandle>, 'id'>,
      typeof ResizeHandle
    >;
    resort?: React.ReactElement<
      IconButtonProps,
      React.ComponentType<IconButtonProps>
    >;
  };
}
