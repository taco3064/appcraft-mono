import Paper from '@mui/material/Paper';

import * as Hook from '../../hooks';
import { GridLayout } from '../common';
import type { RendererContentProps } from './RendererContent.types';
import type { RendererOptions } from '../../hooks';

export default function RendererContent<T extends RendererOptions>({
  GridLayoutProps,
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
      {options.map(({ id, template }) => {
        const widget = templates.get(template?.id);

        return (
          <Paper key={id} elevation={elevation}>
            {id}
            {isPrepared &&
              widget &&
              render(widget, { state: { id: template.id } })}
          </Paper>
        );
      })}
    </GridLayout>
  );
}
