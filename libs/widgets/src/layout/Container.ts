import Container from '@mui/material/Container';
import type { ComponentProps } from 'react';

export { Container };

export type ContainerProps = Pick<
  ComponentProps<typeof Container>,
  'children' | 'disableGutters' | 'fixed' | 'maxWidth'
>;
