import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiTypography.types';

export const GapTypography = withStyles(
  Typography,
  (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      height: theme.spacing(5),
    },
  }),
  { name: 'GapTypography' }
);

export const AutoBreakTypography = withStyles(
  ({
    autoBreakpoint = 'sm',
    classes,
    primary,
    secondary,
    primaryTypographyProps,
    secondaryTypographyProps,
  }: Types.AutoBreakTypographyProps) => {
    const theme = useTheme();

    const isAutoBreak = useMediaQuery(
      theme.breakpoints.down(autoBreakpoint === 'xs' ? 'sm' : autoBreakpoint)
    );

    return (
      <GapTypography
        variant="subtitle1"
        fontWeight="bolder"
        color="primary"
        className={classes?.root}
        {...primaryTypographyProps}
      >
        {primary}

        {secondary &&
          (isAutoBreak ? (
            <>
              <br />
              <Typography
                variant="caption"
                color="text.secondary"
                {...secondaryTypographyProps}
              >
                {secondary}
              </Typography>
            </>
          ) : (
            <>
              <Divider flexItem orientation="vertical" />

              {secondary}
            </>
          ))}
      </GapTypography>
    );
  },
  (theme, { autoBreakpoint = 'sm' }) => ({
    root: {
      height: 'auto',

      [theme.breakpoints.down(autoBreakpoint === 'xs' ? 'sm' : autoBreakpoint)]:
        {
          display: 'block !important',
        },
    },
  }),
  { name: 'AutoBreakTypography' }
);
