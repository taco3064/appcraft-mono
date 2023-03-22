import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import { withStyles } from 'tss-react/mui';

type BaseLinkProps = NextLinkProps & Omit<MuiLinkProps, 'component' | 'href'>;

interface LinkProps extends BaseLinkProps {
  icon?: ReactNode;
}

export const Link = withStyles(
  ({ icon, children, ...props }: LinkProps) => (
    <MuiLink
      {...props}
      component={NextLink}
      href="/"
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
  ),
  (theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  }),
  { name: 'Link' }
);
