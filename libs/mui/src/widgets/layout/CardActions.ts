import CardActions from '@mui/material/CardActions';
import type { ComponentProps } from 'react';

export { CardActions };

export type CardActionsProps = Pick<
  ComponentProps<typeof CardActions>,
  'children' | 'disableSpacing'
>;
