import MuiListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import type { ComponentProps } from 'react';

export type ListItemSecondaryActionProps = Pick<
  ComponentProps<typeof MuiListItemSecondaryAction>,
  'children'
>;

export const ListItemSecondaryAction = (
  props: ListItemSecondaryActionProps
) => (
  <MuiListItemSecondaryAction {...props} onClick={(e) => e.stopPropagation()} />
);
