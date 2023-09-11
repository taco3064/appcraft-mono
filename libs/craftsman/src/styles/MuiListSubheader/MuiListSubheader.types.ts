import ListSubheader, { ListSubheaderProps } from '@mui/material/ListSubheader';
import type { ComponentRef } from 'react';

export type ListToolbarRef = ComponentRef<typeof ListSubheader>;
export type ListToolbarProps = Omit<ListSubheaderProps, 'component'> & {
  muiSkipListHighlight?: boolean;
};
