import ListItemText from '@mui/material/ListItemText';
import type { ComponentProps } from 'react';

import type { TypographyProps } from '../tool/Typography';

export { ListItemText };

export type ListItemTextProps = Pick<
  ComponentProps<typeof ListItemText>,
  'disableTypography' | 'inset' | 'primary' | 'secondary'
> & {
  primaryTypographyProps?: Partial<TypographyProps>;
  secondaryTypographyProps?: Partial<TypographyProps>;
};
