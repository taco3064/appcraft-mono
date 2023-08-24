import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiLink.types';

export const Link = withStyles(
  forwardRef<HTMLAnchorElement, Types.LinkProps>(function Link(
    { icon, children, href, disableGap: _disableGap, ...props },
    ref
  ) {
    return (
      <MuiLink ref={ref} {...props} href={href as string} component={NextLink}>
        {icon}
        {children}
      </MuiLink>
    );
  }),
  (theme, { disableGap = false }) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(disableGap ? 0 : 1),
      userSelect: 'none',
    },
  }),
  { name: 'Link' }
);
