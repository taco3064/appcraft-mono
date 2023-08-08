import AccordionDetails from '@mui/material/AccordionDetails';
import type { ComponentProps } from 'react';

export { AccordionDetails };

export type AccordionDetailsProps = Pick<
  ComponentProps<typeof AccordionDetails>,
  'children'
>;
