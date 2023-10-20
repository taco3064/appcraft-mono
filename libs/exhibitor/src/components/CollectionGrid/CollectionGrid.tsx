import * as Dnd from '@dnd-kit/core';
import * as Sortable from '@dnd-kit/sortable';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import type { Translate } from '@dnd-kit/core';

import { useBreakpointValue } from '../../hooks';
import type { CollectionGridProps } from './CollectionGrid.types';

export default function CollectionGrid<T extends { id: string }>({
  breakpoint,
  cols,
  items = [],
  renderContent,
  onResize,
  onResort,
  ...props
}: CollectionGridProps<T>) {
  const theme = useTheme();
  const listRef = useRef<HTMLUListElement>(null);
  const resizedRef = useRef<Record<'t' | 'x' | 'y' | 'w' | 'h', number>>();
  const col = useBreakpointValue(cols || { xs: 2 }, breakpoint);

  const rowHeight =
    props.rowHeight +
    Number.parseFloat(onResize || onResort ? theme.spacing(6) : '0');

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
    <Dnd.DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        const { id } = active as { id: string };
        const rect = listRef.current?.getBoundingClientRect();

        if (id.startsWith('resize-') && rect) {
          const itemNode = document.getElementById(id.replace(/^resize-/, ''));

          resizedRef.current = {
            t: rect.width / col.matched,
            x: 0,
            y: 0,
            w: itemNode?.clientWidth || 0,
            h: itemNode?.clientHeight || 0,
          };
        }
      }}
      onDragMove={({ active, delta }) => {
        const { current: resized } = resizedRef;
        const rect = listRef.current?.getBoundingClientRect();

        if (resized && rect) {
          const id = active.id.toString().replace(/^resize-/, '');
          const itemNode = document.getElementById(id) as HTMLElement;

          const diffx = delta.x - (resized?.x || 0);
          const diffy = delta.y - (resized?.y || 0);

          resized.x = delta.x;
          resized.y = delta.y;
          resized.w = resized.w + diffx;
          resized.h = resized.h + diffy;

          itemNode.style.height = `${resized.h}px`;

          itemNode.style.gridColumnEnd = `span ${Math.max(
            1,
            Math.min(col.matched, Math.round(resized.w / resized.t))
          )}`;

          itemNode.style.gridRowEnd = `span ${Math.max(
            1,
            Math.round(resized.h / rowHeight)
          )}`;
        }
      }}
      onDragEnd={({ active, over }) => {
        const { current: resized } = resizedRef;

        if (resized) {
          const id = active.id.toString().replace(/^resize-/, '');
          const item = items.find((item) => item.id === id) as T;

          onResize?.(item, {
            cols: Math.max(
              1,
              Math.min(col.matched, Math.round(resized.w / resized.t))
            ),
            rows: Math.max(1, Math.round(resized.h / rowHeight)),
          });

          resizedRef.current = undefined;
        } else if (active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over?.id);

          onResort?.(Sortable.arrayMove(items, activeIndex, overIndex));
        }
      }}
    >
      <Sortable.SortableContext
        disabled={!onResort || items.length < 2}
        items={items}
        strategy={Sortable.rectSortingStrategy}
      >
        <Container
          maxWidth={breakpoint || false}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            flexWrap: 'nowrap',
          }}
        >
          <ImageList
            ref={listRef}
            gap={8}
            {...props}
            variant="standard"
            cols={col.matched}
            rowHeight={rowHeight}
            sx={{
              minHeight: '100%',
              height: 'max-content',
              marginY: 0,
              alignContent: 'start',
              overflow: 'hidden !important',
            }}
          >
            {renderContent(items, col.breakpoint)}
          </ImageList>
        </Container>
      </Sortable.SortableContext>
    </Dnd.DndContext>
  );
}
