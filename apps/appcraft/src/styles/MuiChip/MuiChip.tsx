import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiChip.types';

export const WebsiteTitle = withStyles(
  ({
    TypographyProps,
    children,
    color,
    variant,
    ...props
  }: Types.WebsiteTitleProps) => (
    <Chip
      {...props}
      color={color}
      variant={variant}
      label={
        <Typography
          fontWeight={600}
          whiteSpace="nowrap"
          color="inherit"
          {...TypographyProps}
        >
          {children}
        </Typography>
      }
    />
  ),
  (theme) => ({
    root: {
      padding: theme.spacing(2.5, 1.5),
      borderRadius: `${theme.spacing(2.5)} / 50%`,
    },
  }),
  { name: 'WebsiteTitle' }
);
