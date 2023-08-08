import AccordionActions from '@mui/material/AccordionActions';
import type { ComponentProps } from 'react';

export { AccordionActions };

export type AccordionActionsProps = Pick<
  ComponentProps<typeof AccordionActions>,
  'children' | 'disableSpacing'
>;
