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
}: Types.ExhibitionContentProps<T>) {
  const layouts = Hook.useGridLayouts(options, GridLayoutProps);

  // const handleMaestro = Hook.usePropsStateMaestro(templates, options, {
  //   onFetchData,
  //   onFetchTodoWrapper: (id) => onFetchTodoWrapper('todo', id),
  //   onOutputCollect,
  //   onReady,
  // });

  const generate = Hook.useComposerRender((Widget, { key, props }) => (
    <Widget key={key} {...props} />
  ));

  return !Array.isArray(options) ? (
    (generate(options, { group: options.id }) as JSX.Element)
  ) : (
    <GridLayout
      {...GridLayoutProps}
      {...{ breakpoint, layouts, options }}
      draggableHandle=".drag-handle"
    >
      {options.map((layout) => (
        <Style.GridLayoutItem key={layout.id} elevation={elevation}>
          <Style.GridLayoutItemContent disableGutters maxWidth={false}>
            {generate(layout.template.id, { group: layout.id })}

            <GridAction action={action} layout={layout} />
          </Style.GridLayoutItemContent>
        </Style.GridLayoutItem>
      ))}
    </GridLayout>
  );
}
