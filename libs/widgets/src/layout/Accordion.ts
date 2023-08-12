import Accordion from '@mui/material/Accordion';
import type { ComponentProps } from 'react';

export { Accordion };

export type AccordionProps = Pick<
  ComponentProps<typeof Accordion>,
  | 'children'
  | 'defaultExpanded'
  | 'disabled'
  | 'disableGutters'
  | 'expanded'
  | 'onChange'
  | 'square'
>;
