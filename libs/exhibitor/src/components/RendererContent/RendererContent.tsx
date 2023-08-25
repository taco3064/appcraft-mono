import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import type { MouseEventHandler } from 'react';

import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { GridLayout } from '../common';
import type * as Types from './RendererContent.types';
import type { RendererOptions } from '../../hooks';

export default function RendererContent<T extends RendererOptions>({
  GridLayoutProps,
  action,
  breakpoint,
  elevation,
  options,
  templates,
  onReady,
  ...props
}: Types.RendererContentProps<T>) {
  const [isPrepared, handleState] = Hook.useRendererState(options, templates);
  const [popover, setPopover] = useState<Types.PopoverOptions>();
  const layouts = Hook.useGridLayouts(options, GridLayoutProps);

  const render = Hook.useRender(
    props,
    handleState,
    (Widget, { key, props: widgetProps }) => (
      <Widget key={key} {...widgetProps} />
    )
  );

  const handleActionClose: MouseEventHandler = ({ target, currentTarget }) => {
    const el = target as HTMLElement;

    if (el.closest('button')?.closest('header') === currentTarget) {
      setPopover({ ...popover, anchorEl: undefined } as Types.PopoverOptions);
    }
  };

  return !Array.isArray(options) ? (
    (((isPrepared && render(options, { state: { id: options.id } })) ||
      null) as JSX.Element)
  ) : (
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
            <Style.GridLayoutItem key={id} elevation={elevation}>
              <Style.GridLayoutItemContent disableGutters maxWidth={false}>
                {isPrepared &&
                  widget &&
                  render(widget, { state: { id: widget.id } })}

                {action && (
                  <Style.GridLayoutItemAction
                    size="small"
                    color="info"
                    variant="extended"
                    disabled={Boolean(popover?.anchorEl)}
                  >
                    <DragIndicatorIcon
                      className="drag-handle"
                      style={{ cursor: 'move' }}
                    />

                    <Divider flexItem orientation="vertical" />

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
                  </Style.GridLayoutItemAction>
                )}
              </Style.GridLayoutItemContent>
            </Style.GridLayoutItem>
          );
        })}
      </GridLayout>

      {action && (
        <Popover
          keepMounted
          anchorEl={popover?.anchorEl}
          open={Boolean(popover?.anchorEl)}
          onClose={() => setPopover(undefined)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
              onClick={handleActionClose}
            >
              <Toolbar variant="dense">{action(popover.layout)}</Toolbar>
            </AppBar>
          )}
        </Popover>
      )}
    </>
  );
}
