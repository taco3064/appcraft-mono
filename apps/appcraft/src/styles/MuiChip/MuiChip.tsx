import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiChip.types';

export const WebsiteTitle = withStyles(
  ({ TypographyProps, children, color, ...props }: Types.WebsiteTitleProps) => (
    <Chip
      {...props}
      color={color}
      label={
        <Typography
          fontWeight={600}
          whiteSpace="nowrap"
          {...TypographyProps}
          color={color}
        >
          {children}
        </Typography>
      }
    />
  ),
  (theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }),
  { name: 'WebsiteTitle' }
);
