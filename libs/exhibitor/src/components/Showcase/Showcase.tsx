import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';

import CollectionGrid from '../CollectionGrid';
import _omit from 'lodash/omit';
import { CollectionItem, ResizeHandle } from '../../styles';
import { useComposerRender } from '../../hooks';
import type { RenderedWidget } from '../../hooks';
import type { ShowcaseProps } from './Showcase.types';

//* Components
export default function Showcase<T extends RenderedWidget>({
  CollectionGridProps,
  elevation,
  options,
}: ShowcaseProps<T>) {
  const generate = useComposerRender((Widget, { key, props }) => (
    <Widget key={key} {...props} />
  ));

  return !Array.isArray(options) ? (
    (generate(options, { group: options.id }) as JSX.Element)
  ) : (
    <CollectionGrid
      {..._omit(CollectionGridProps, ['renderAction'])}
      items={options}
      renderContent={(items, breakpoint, rowHeight) =>
        items.map((item) => {
          const { id, layout, template } = item;

          return (
            <CollectionItem
              {...{ breakpoint, elevation, id, rowHeight }}
              key={id}
              action={CollectionGridProps?.renderAction?.(item)}
              layouts={layout}
              DragHandle={{
                resize: CollectionGridProps?.onResize && <ResizeHandle />,
                resort: CollectionGridProps?.onResort && (
                  <IconButton>
                    <DragIndicatorIcon />
                  </IconButton>
                ),
              }}
            >
              {generate(template.id, {
                group: id,
                injection: template,
              })}
            </CollectionItem>
          );
        })
      }
    />
  );
}
