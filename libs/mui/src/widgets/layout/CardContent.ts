import CardContent from '@mui/material/CardContent';
import type { ComponentProps } from 'react';

export { CardContent };

export type CardContentProps = Pick<
  ComponentProps<typeof CardContent>,
  'children'
>;
