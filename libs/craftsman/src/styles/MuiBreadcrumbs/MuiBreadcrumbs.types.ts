import type { LinkProps } from '@mui/material/Link';
import type { TypographyProps } from '@mui/material/Typography';
import type { MouseEventHandler } from 'react';

export type BreadcrumbProps<V extends 'link' | 'text', P> = {
  brcVariant: V;
} & P;

export type BreadcrumbLinkProps = BreadcrumbProps<
  'link',
  Omit<LinkProps, 'component'> & {
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
>;

export type BreadcrumbTextProps = BreadcrumbProps<
  'text',
  Omit<TypographyProps, 'component'>
>;
