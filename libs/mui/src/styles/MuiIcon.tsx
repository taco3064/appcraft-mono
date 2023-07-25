import Badge, { BadgeProps } from '@mui/material/Badge';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import cx from 'clsx';
import { withStyles } from 'tss-react/mui';

export const CompositeIcon = (() => {
  interface CompositeIconProps {
    anchorOrigin?: BadgeProps['anchorOrigin'];
    primary: typeof SvgIcon;
    primaryProps?: SvgIconProps;
    secondary: typeof SvgIcon;
    secondaryProps?: Omit<SvgIconProps, 'fontSize'>;
    classes?: {
      primary?: string;
      secondary?: string;
      badge?: string;
    };
  }

  return withStyles(
    ({
      anchorOrigin,
      classes,
      primary: PrimaryIcon,
      primaryProps,
      secondary: SecondaryIcon,
      secondaryProps,
    }: CompositeIconProps) => (
      <Badge
        className={classes?.badge}
        anchorOrigin={{
          vertical: anchorOrigin?.vertical || 'bottom',
          horizontal: anchorOrigin?.horizontal || 'right',
        }}
        badgeContent={
          <SecondaryIcon
            {...secondaryProps}
            fontSize="small"
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
        margin: theme.spacing(1),
        transform: `translate(${
          anchorOrigin?.vertical === 'top' ? 25 : -25
        }%, ${anchorOrigin?.horizontal === 'left' ? 25 : -25}%)`,
      },
    }),
    { name: 'CompositeIcon' }
  );
})();
