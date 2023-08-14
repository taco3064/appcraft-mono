import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { ReactNode } from 'react';

type BaseLinkProps = NextLinkProps & Omit<MuiLinkProps, 'component' | 'href'>;

export interface LinkProps extends BaseLinkProps {
  disableGap?: boolean;
  icon?: ReactNode;
}
