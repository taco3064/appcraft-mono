import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import StorageIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';
import _get from 'lodash/get';
import cx from 'clsx';
import { Handle, HandleProps } from 'reactflow';
import { withStyles } from 'tss-react/mui';
import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import { CompositeIcon } from '../MuiIcon';
import { TypeItemAction } from '../MuiListItemSecondaryAction';

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
  fetch = 'palette.secondary.main',
  branch = 'palette.success.main',
  iterate = 'palette.success.main',
  wrap = 'palette.info.main',
  state = 'palette.grey.700',
}
