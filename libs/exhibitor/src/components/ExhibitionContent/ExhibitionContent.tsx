import * as Hook from '../../hooks';
import * as Style from '../../styles';
import GridAction from '../GridAction';
import GridLayout from '../GridLayout';
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
            {generate(layout.template.id, {
              group: layout.id,
              injection: layout.template,
            })}

            <GridAction action={action} layout={layout} />
          </Style.GridLayoutItemContent>
        </Style.GridLayoutItem>
      ))}
    </GridLayout>
  );
}
