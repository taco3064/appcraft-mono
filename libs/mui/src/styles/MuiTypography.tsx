import Divider from '@mui/material/Divider';
import Typography, { TypographyProps } from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint, useTheme } from '@mui/material/styles';
import { withStyles } from 'tss-react/mui';

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

export const AutoBreakTypography = (() => {
  interface AutoBreakTypographyProps {
    autoBreakpoint?: Breakpoint;
    primaryTypographyProps?: Omit<TypographyProps, 'className'>;
    secondaryTypographyProps?: Omit<TypographyProps, 'className'>;
    primary: string;
    secondary?: string;

    classes?: {
      root?: string;
    };
  }

  return withStyles(
    ({
      autoBreakpoint = 'sm',
      classes,
      primary,
      secondary,
      primaryTypographyProps,
      secondaryTypographyProps,
    }: AutoBreakTypographyProps) => {
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

        [theme.breakpoints.down(
          autoBreakpoint === 'xs' ? 'sm' : autoBreakpoint
        )]: {
          display: 'block !important',
        },
      },
    }),
    { name: 'AutoBreakTypography' }
  );
})();
