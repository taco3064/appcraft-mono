import * as Dnd from '@dnd-kit/core';
import * as Sortable from '@dnd-kit/sortable';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';

import { useBreakpointValue, useDndHandles } from '../../hooks';
import type { CollectionGridProps } from './CollectionGrid.types';

export default function CollectionGrid<T extends { id: string }>({
  breakpoint,
  cols,
  disableResort = false,
  items = [],
  maxWidthes,
  renderContent,
  onResize,
  onResort,
  ...props
}: CollectionGridProps<T>) {
  const theme = useTheme();
  const maxWidth = useBreakpointValue(maxWidthes, breakpoint);
  const col = useBreakpointValue(cols || { xs: 2 }, maxWidth.matched);

  const toolbarHeight = Number.parseFloat(
    onResize || onResort ? theme.spacing(6) : '0'
  );

  const rowHeight = props.rowHeight + toolbarHeight;

  const [listRef, dndHandles] = useDndHandles(items, col.matched, rowHeight, {
    onResize,
    onResort,
  });

  const sensors = Dnd.useSensors(
    Dnd.useSensor(Dnd.MouseSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
    Dnd.useSensor(Dnd.TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <Dnd.DndContext {...dndHandles} sensors={sensors}>
      <Sortable.SortableContext
        disabled={!onResort || disableResort}
        items={items}
        strategy={Sortable.rectSortingStrategy}
      >
        <Container disableGutters maxWidth={maxWidth.matched}>
          <ImageList
            ref={listRef}
            gap={8}
            {...props}
            variant="standard"
            cols={col.matched}
            rowHeight={rowHeight}
            sx={(theme) => ({
              width: '100%',
              minHeight: '100%',
              height: 'max-content',
              marginY: 0,
              alignContent: 'start',
            })}
          >
            {renderContent(items, {
              breakpoint: maxWidth.matched,
              cols: col.matched,
              rowHeight,
              gap: props.gap || 8,
            })}
          </ImageList>
        </Container>
      </Sortable.SortableContext>
    </Dnd.DndContext>
  );
}
