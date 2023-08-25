import Badge from '@mui/material/Badge';
import cx from 'clsx';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiIcon.types';

export const CompositeIcon = withStyles(
  ({
    anchorOrigin,
    classes,
    primary: PrimaryIcon,
    primaryProps,
    secondary: SecondaryIcon,
    secondaryProps,
  }: Types.CompositeIconProps) => (
    <Badge
      className={classes?.badge}
      anchorOrigin={{
        vertical: anchorOrigin?.vertical || 'bottom',
        horizontal: anchorOrigin?.horizontal || 'right',
      }}
      badgeContent={
        <SecondaryIcon
          {...secondaryProps}
          className={cx(secondaryProps?.className, classes?.secondary)}
        />
      }
    >
      <PrimaryIcon
        {...primaryProps}
        className={cx(primaryProps?.className, classes?.primary)}
      />
    </Badge>
  ),
  (theme, { anchorOrigin }) => ({
    badge: {
      zIndex: 0,
    },
    secondary: {
      backdropFilter: `blur(${theme.spacing(2)})`,
      borderRadius: '50%',
      fontSize: theme.spacing(2),
      margin: theme.spacing(1),
      transform: `translate(${anchorOrigin?.vertical === 'top' ? 25 : -25}%, ${
        anchorOrigin?.horizontal === 'left' ? 25 : -25
      }%)`,
    },
  }),
  { name: 'CompositeIcon' }
);
