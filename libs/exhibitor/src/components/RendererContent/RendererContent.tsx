import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';

import * as Hook from '../../hooks';
import { GridLayout } from '../common';
import type { RendererContentProps } from './RendererContent.types';
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
    <GridLayout {...GridLayoutProps} {...{ breakpoint, options }}>
      {options.map((layout) => {
        const { id, template } = layout;
        const widget = templates.get(template?.id);

        return (
          <Paper key={id} elevation={elevation} sx={{ position: 'relative' }}>
            {isPrepared &&
              widget &&
              render(widget, { state: { id: template.id } })}

            {action && (
              <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={(theme) => ({
                  borderRadius: `${theme.spacing(2.5)} / 50%`,
                  position: 'absolute',
                  width: 'auto',
                  bottom: 0,
                  left: theme.spacing(1),
                  zIndex: theme.zIndex.fab,
                  transform: 'scale(0.8)',
                })}
              >
                <Toolbar disableGutters variant="dense">
                  {action(layout)}
                </Toolbar>
              </AppBar>
            )}
          </Paper>
        );
      })}
    </GridLayout>
  );
}
