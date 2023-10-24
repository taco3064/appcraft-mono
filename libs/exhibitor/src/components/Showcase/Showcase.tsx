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
      disableResort={options.length < 2}
      items={options}
      renderContent={(items, GridProps) =>
        items.map((item) => {
          const { id, layouts, template } = item;

          return (
            <CollectionItem
              {...{ GridProps, id, layouts }}
              key={id}
              action={CollectionGridProps?.renderAction?.(item)}
              DragHandle={{
                resize: CollectionGridProps?.onResize && <ResizeHandle />,
                resort: CollectionGridProps?.onResort && (
                  <IconButton disabled={options.length < 2}>
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
