import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import { withStyles } from 'tss-react/mui';

type BaseLinkProps = NextLinkProps & Omit<MuiLinkProps, 'component' | 'href'>;

interface LinkProps extends BaseLinkProps {
  disableGap?: boolean;
  icon?: ReactNode;
}

export const Link = withStyles(
  ({ icon, children, href, disableGap: _disableGap, ...props }: LinkProps) => (
    <MuiLink
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
  ),
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
