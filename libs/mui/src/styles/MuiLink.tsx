import Link, { LinkProps } from '@mui/material/Link';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

export const BreadcrumbLink = withStyles(
  forwardRef<HTMLAnchorElement, Omit<LinkProps, 'component'>>((props, ref) => (
    <Link {...props} {...{ component: 'button' }} ref={ref} />
  )),
  (theme) => ({
    root: {
      color: theme.palette.text.primary,
      fontSize: theme.typography.subtitle1.fontSize,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
  { name: 'BreadcrumbLink' }
);
