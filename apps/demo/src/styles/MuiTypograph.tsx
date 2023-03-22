import Typograph, { TypographyProps } from '@mui/material/Typography';
import { ReactNode } from 'react';
import { withStyles } from 'tss-react/mui';

interface IconTypographProps extends TypographyProps {
  icon?: ReactNode;
}

export const IconTypograph = withStyles(
  ({ children, icon, ...props }: IconTypographProps) => (
    <Typograph {...props}>
      {icon}
      {children}
    </Typograph>
  ),
  (theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  }),
  { name: 'IconTypograph' }
);
