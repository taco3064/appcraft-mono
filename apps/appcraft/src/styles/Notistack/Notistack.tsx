import * as Notistack from 'notistack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import cx from 'clsx';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './Notistack.types';

const origin: Notistack.SnackbarOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

const MuiSnackbarContent = withStyles(
  forwardRef<never, Types.MuiSnackbarContentProps>(function MuiSnackbarContent(
    { classes, className, ...props },
    ref
  ) {
    return (
      <Notistack.MaterialDesignContent
        {...props}
        ref={ref}
        className={cx(classes?.root, className)}
      />
    );
  }),
  (theme, { variant }) => {
    const background =
      variant === 'default'
        ? theme.palette.background.paper
        : theme.palette[variant].dark;

    return {
      root: {
        background,
        borderRadius: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontSize: theme.typography.subtitle1.fontSize,
        whiteSpace: 'pre-line',
      },
    };
  },
  { name: 'MuiSnackbarContent' }
);

export const MuiSnackbarProvider = withStyles(
  forwardRef<never, Types.MuiSnackbarProviderProps>(
    function MuiSnackbarProvider(
      { classes: { icon: iconClassName, ...classes } = {}, ...props },
      ref
    ) {
      return (
        <Notistack.SnackbarProvider
          {...props}
          ref={ref}
          anchorOrigin={origin}
          classes={classes}
          iconVariant={{
            info: <InfoOutlinedIcon className={iconClassName} />,
            success: <TaskAltIcon className={iconClassName} />,
            warning: <WarningAmberIcon className={iconClassName} />,
            error: <ErrorOutlineIcon className={iconClassName} />,
          }}
          Components={{
            default: MuiSnackbarContent,
            info: MuiSnackbarContent,
            success: MuiSnackbarContent,
            warning: MuiSnackbarContent,
            error: MuiSnackbarContent,
          }}
        />
      );
    }
  ),
  (theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
  }),
  { name: 'MuiSnackbarProvider' }
);
