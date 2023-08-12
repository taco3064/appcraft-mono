import AccordionSummary from '@mui/material/AccordionSummary';
import type { ComponentProps } from 'react';

export { AccordionSummary };

export type AccordionSummaryProps = Pick<
  ComponentProps<typeof AccordionSummary>,
  'children' | 'expandIcon'
>;
