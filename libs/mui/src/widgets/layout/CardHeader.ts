import CardHeader from '@mui/material/CardHeader';
import type { ComponentProps } from 'react';

import type { TypographyProps } from '../tool/Typography';

export { CardHeader };

export type CardHeaderProps = Pick<
  ComponentProps<typeof CardHeader>,
  'action' | 'avatar' | 'disableTypography' | 'subheader' | 'title'
> & {
  subheaderTypographyProps?: Partial<TypographyProps>;
  titleTypographyProps?: Partial<TypographyProps>;
};
