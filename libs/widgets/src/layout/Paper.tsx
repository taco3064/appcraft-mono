import MuiPaper from '@mui/material/Paper';
import { withStyles } from 'tss-react/mui';
import type { ComponentProps } from 'react';

export type PaperProps = Pick<
  ComponentProps<typeof MuiPaper>,
  'children' | 'elevation' | 'square' | 'variant'
>;

export const Paper = withStyles(
  MuiPaper,
  (theme) => ({
    root: {
      boxShadow: 'none',
    },
  }),
  { name: 'Paper' }
);
