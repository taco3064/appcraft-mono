import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import TuneIcon from '@mui/icons-material/Tune';
import { Fragment, useMemo, useState } from 'react';
import type { Layouts } from 'react-grid-layout';

import * as Hook from '../../hooks';
import { GridLayout } from '../common';
import type {
  PopoverOptions,
  RendererContentProps,
} from './RendererContent.types';
import type { RendererOptions } from '../../hooks';

export default function RendererContent<T extends RendererOptions>({
  GridLayoutProps,
  action,
  breakpoint,
  elevation,
  options,
  templates,
  ...props
}: RendererContentProps<T>) {
  const [isPrepared, handleState] = Hook.useRendererState(options, templates);
  const [popover, setPopover] = useState<PopoverOptions>();

  const layouts = useMemo(
    () =>
      (Array.isArray(options) ? options : []).reduce<Layouts>(
        (result, { id, layout }) => {
          Object.entries(layout).forEach(([key, opts]) => {
            const { [key]: acc = [] } = result;

            acc.push({ i: id, ...opts });
            result[key] = acc;
          });

          return result;
        },
        {}
      ),
    [options]
  );

  const render = Hook.useRender(
    props,
    handleState,
    (Widget, { key, props: widgetProps }) => (
      <Widget key={key} {...widgetProps} />
    )
  );

  if (!Array.isArray(options)) {
    return ((isPrepared && render(options, { state: { id: options.id } })) ||
      null) as JSX.Element;
  }

  return (
    <>
      <GridLayout
        {...GridLayoutProps}
        {...{ breakpoint, layouts, options }}
        draggableHandle=".drag-handle"
      >
        {options.map((layout) => {
          const { id, template } = layout;
          const widget = templates.get(template?.id);

          return (
            <Paper
              key={id}
              elevation={elevation}
              sx={(theme) => ({
                position: 'relative',
                borderRadius: theme.shape.borderRadius,

                transition: theme.transitions.create(['width', 'height'], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              })}
            >
              <Container
                disableGutters
                maxWidth={false}
                sx={(theme) => ({
                  borderRadius: theme.shape.borderRadius,

                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden auto',
                  height: '100%',
                })}
              >
                {isPrepared &&
                  widget &&
                  render(widget, { state: { id: widget.id } })}

                {action && (
                  <Fab
                    size="small"
                    color="info"
                    variant="extended"
                    disabled={Boolean(popover?.anchorEl)}
                    sx={(theme) => ({
                      position: 'absolute',
                      bottom: theme.spacing(1),
                      left: theme.spacing(1),
                      zIndex: theme.zIndex.fab,
                      gap: theme.spacing(1),
                      color: theme.palette.common.white,

                      '&:disabled': {
                        backdropFilter: `blur(${theme.spacing(2)})`,
                      },
                    })}
                  >
                    <DragIndicatorIcon className="drag-handle" />
                    <Divider
                      flexItem
                      orientation="vertical"
                      sx={(theme) => ({
                        borderColor: theme.palette.common.white,
                        opacity: theme.palette.action.activatedOpacity,
                      })}
                    />

                    <TuneIcon
                      onClick={(e) =>
                        setPopover({
                          layout,
                          anchorEl: e.currentTarget.closest(
                            'button'
                          ) as HTMLButtonElement,
                        })
                      }
                    />
                  </Fab>
                )}
              </Container>
            </Paper>
          );
        })}
      </GridLayout>

      {action && (
        <Popover
          keepMounted
          anchorEl={popover?.anchorEl}
          open={Boolean(popover?.anchorEl)}
          onClose={() => setPopover(undefined)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: (theme) => ({
              borderRadius: `${theme.spacing(2.5)} / 50%`,
              marginTop: theme.spacing(1),
            }),
          }}
        >
          {popover?.layout && (
            <AppBar
              position="static"
              color="default"
              onClick={({ target, currentTarget }) => {
                const el = target as HTMLElement;

                if (el.closest('button')?.closest('header') === currentTarget) {
                  setPopover({ ...popover, anchorEl: undefined });
                }
              }}
            >
              <Toolbar variant="dense">{action(popover.layout)}</Toolbar>
            </AppBar>
          )}
        </Popover>
      )}
    </>
  );
}
