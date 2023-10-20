import MuiCard from '@mui/material/Card';
import { withStyles } from 'tss-react/mui';
import type { ComponentProps } from 'react';

export type CardProps = Pick<
  ComponentProps<typeof MuiCard>,
  'children' | 'raised'
>;

export const Card = withStyles(
  MuiCard,
  (theme) => ({
    root: {
      boxShadow: 'none',
    },
  }),
  { name: 'Card' }
);
