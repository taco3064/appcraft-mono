import AppBar from '@mui/material/AppBar';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormEventHandler, ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { withStyles } from 'tss-react/mui';

import { GapTypography } from './MuiTypography';

export const FlexDialog = (() => {
  interface FlexDialogProps
    extends Omit<DialogProps, 'classes' | 'scroll' | 'onSubmit'> {
    disableContentGutter?: boolean;
    disableContentJustifyCenter?: boolean;
    disableContentPadding?: boolean;
    icon?: ReactNode;
    title?: string;
    action?: ReactNode;
    children: ReactNode;
    direction?: 'row' | 'column';
    onSubmit?: FormEventHandler<HTMLFormElement>;

    classes?: DialogProps['classes'] & {
      header?: string;
      closeButton?: string;
      content?: string;
      footer?: string;
    };
  }

  return withStyles(
    ({
      PaperProps,
      action,
      children,
      classes = {},
      fullScreen: fs = false,
      icon,
      title,
      onClose,
      onSubmit,
      ...props
    }: FlexDialogProps) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.only('xs')) || fs;

      const {
        header: headerClassName,
        closeButton: closeButtonClassName,
        content: contentClassName,
        footer: footerClassName,
        ...dialogClasses
      } = classes;

      return (
        <Dialog
          {...props}
          scroll="body"
          classes={dialogClasses}
          fullScreen={fullScreen}
          onClose={onClose}
          PaperProps={{
            elevation: 0,
            ...PaperProps,
            ...(onSubmit && ({ component: 'form', onSubmit } as object)),
          }}
        >
          {(title || icon) && (
            <AppBar
              enableColorOnDark
              position="static"
              className={headerClassName}
              elevation={0}
            >
              <Toolbar variant="regular">
                <GapTypography
                  {...(!fullScreen && { marginX: 'auto' })}
                  variant="h5"
                  fontWeight="bolder"
                  color={fullScreen ? 'inherit' : 'primary'}
                >
                  {icon}
                  {title}
                </GapTypography>

                {fullScreen && onClose && (
                  <IconButton
                    size="small"
                    color="inherit"
                    className={closeButtonClassName}
                    onClick={(e) => onClose(e, 'escapeKeyDown')}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Toolbar>

              <Divider />
            </AppBar>
          )}

          <DialogContent className={contentClassName}>{children}</DialogContent>

          {action && (
            <ButtonGroup
              fullWidth
              color="inherit"
              size="large"
              variant="contained"
              className={footerClassName}
              component={DialogActions}
            >
              {action}
            </ButtonGroup>
          )}
        </Dialog>
      );
    },
    (
      theme,
      {
        direction = 'row',
        disableContentGutter = false,
        disableContentJustifyCenter = false,
        disableContentPadding = false,
        fullScreen,
      }
    ) => ({
      paper: {
        display: 'inline-flex',
        flexDirection: 'column' as never,
        overflow: 'hidden',
        borderRadius: theme.spacing(2),
      },
      header: {
        background: 'transparent',

        [theme.breakpoints.only('xs')]: {
          borderTopLeftRadius: theme.spacing(2),
          borderTopRightRadius: theme.spacing(2),
        },
        ...(fullScreen && {
          borderTopLeftRadius: theme.spacing(2),
          borderTopRightRadius: theme.spacing(2),
        }),
        '& > div': {
          color: theme.palette.common.white,
        },
        '& > hr': {
          margin: theme.spacing(0, 3),
        },
      },
      closeButton: {
        position: 'absolute' as never,
        right: theme.spacing(2),
        top: '50%',
        transform: 'translate(0, -50%)',
      },
      content: {
        display: 'flex',
        flexDirection: direction,
        justifyContent: disableContentJustifyCenter ? 'flex-start' : 'center',
        gap: theme.spacing(2),
        background: 'inherit',
        padding: theme.spacing(
          disableContentPadding ? 0 : 3,
          disableContentGutter ? 0 : 3
        ),

        [theme.breakpoints.only('xs')]: {
          overflow: 'hidden auto',
        },
        ...(fullScreen && {
          overflow: 'hidden auto',
        }),
      },
      footer: {
        padding: 0,

        '& > button': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          margin: '0 !important',

          '&:first-child': {
            borderBottomLeftRadius: theme.spacing(2),
          },
          '&:last-child': {
            borderBottomRightRadius: theme.spacing(2),
          },
        },
      },
    }),
    { name: 'FlexDialog' }
  );
})();
