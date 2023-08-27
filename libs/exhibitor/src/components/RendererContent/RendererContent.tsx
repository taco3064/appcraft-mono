import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { GridAction, GridLayout } from '../common';
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
  const layouts = Hook.useGridLayouts(options, GridLayoutProps);

  const render = Hook.useRender(
    props,
    handleState,
    (Widget, { key, props: widgetProps }) => (
      <Widget key={key} {...widgetProps} />
    )
  );

  return !Array.isArray(options) ? (
    (((isPrepared && render(options, { state: { id: options.id } })) ||
      null) as JSX.Element)
  ) : (
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

              <GridAction action={action} layout={layout} />
            </Style.GridLayoutItemContent>
          </Style.GridLayoutItem>
        );
      })}
    </GridLayout>
  );
}
