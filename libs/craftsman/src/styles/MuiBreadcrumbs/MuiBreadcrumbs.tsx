import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ForwardedRef, forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiBreadcrumbs.types';

export const Breadcrumb = (function <R>() {
  return withStyles(
    forwardRef<R, Types.BreadcrumbLinkProps | Types.BreadcrumbTextProps>(
      ({ brcVariant, onClick, ...props }, ref) =>
        brcVariant === 'text' ? (
          <Typography {...props} ref={ref as ForwardedRef<HTMLSpanElement>} />
        ) : (
          <Link
            {...props}
            {...{ component: 'button', onClick }}
            ref={ref as ForwardedRef<HTMLAnchorElement>}
          />
        )
    ),
    (theme, { brcVariant }) => ({
      root: {
        fontSize: theme.typography.subtitle1.fontSize,

        color:
          brcVariant === 'link'
            ? theme.palette.text.secondary
            : theme.palette.secondary.main,

        ...(brcVariant === 'link' && {
          textDecoration: 'none',

          '&:hover': {
            textDecoration: 'underline',
          },
        }),
      },
    }),
    { name: 'Breadcrumb' }
  );
})();
