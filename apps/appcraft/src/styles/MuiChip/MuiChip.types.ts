import type { ChipProps } from '@mui/material/Chip';
import type { TypographyProps } from '@mui/material/Typography';

export interface WebsiteTitleProps extends Omit<ChipProps, 'children'> {
  TypographyProps?: TypographyProps;
  children: string;
}
