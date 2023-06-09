import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode, forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

type BaseLinkProps = NextLinkProps & Omit<MuiLinkProps, 'component' | 'href'>;

interface LinkProps extends BaseLinkProps {
  disableGap?: boolean;
  icon?: ReactNode;
}

export const Link = withStyles(
  forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    { icon, children, href, disableGap: _disableGap, ...props },
    ref
  ) {
    return (
      <MuiLink
        ref={ref}
        {...props}
        href={href as string}
        component={NextLink}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: theme.spacing(1.5),
        })}
      >
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
    },
  }),
  { name: 'Link' }
);
