import Link, { LinkProps } from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { ForwardedRef, MouseEventHandler, forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

export const Breadcrumb = (function <R>() {
  type BreadcrumbProps<V extends 'link' | 'text', P> = {
    brcVariant: V;
  } & P;

  type BreadcrumbLinkProps = BreadcrumbProps<
    'link',
    Omit<LinkProps, 'component'> & {
      onClick: MouseEventHandler<HTMLButtonElement>;
    }
  >;

  type BreadcrumbTextProps = BreadcrumbProps<
    'text',
    Omit<TypographyProps, 'component'>
  >;

  return withStyles(
    forwardRef<R, BreadcrumbLinkProps | BreadcrumbTextProps>(
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
        color: theme.palette.secondary.main,
        fontSize: theme.typography.subtitle1.fontSize,

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
