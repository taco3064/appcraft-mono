import Card from '@mui/material/Card';
import type { ComponentProps } from 'react';

export { Card };

export type CardProps = Pick<
  ComponentProps<typeof Card>,
  'children' | 'raised'
>;
