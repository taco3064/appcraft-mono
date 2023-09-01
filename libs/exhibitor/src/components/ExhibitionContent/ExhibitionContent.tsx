import { GridAction, GridLayout } from '../common';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import type * as Types from './ExhibitionContent.types';
import type { RenderedWidget } from '../../hooks';

export default function ExhibitionContent<T extends RenderedWidget>({
  GridLayoutProps,
  action,
  breakpoint,
  elevation,
  options,
  templates,
  onReady,
  ...props
}: Types.ExhibitionContentProps<T>) {
  const { onFetchData, onFetchTodoWrapper, onOutputCollect } = props;
  const layouts = Hook.useGridLayouts(options, GridLayoutProps);

  const handleState = Hook.usePropsStateMaestro(templates, options, {
    onFetchData,
    onFetchTodoWrapper: (id) => onFetchTodoWrapper('todo', id),
    onOutputCollect,
    onReady,
  });

  const render = Hook.useComposerRender(
    props,
    handleState,
    (Widget, { key, props: widgetProps }) => (
      <Widget key={key} {...widgetProps} />
    )
  );

  return !Array.isArray(options) ? (
    ((render(options, { owner: { id: options.id } }) || null) as JSX.Element)
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
              {widget && render(widget, { owner: { id: widget.id } })}

              <GridAction action={action} layout={layout} />
            </Style.GridLayoutItemContent>
          </Style.GridLayoutItem>
        );
      })}
    </GridLayout>
  );
}
