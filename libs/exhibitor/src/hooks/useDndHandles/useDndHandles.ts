import { arrayMove } from '@dnd-kit/sortable';
import { useRef } from 'react';

import type * as Types from './useDndHandles.types';

//* Methods
const getColsAndRows: Types.GetColsAndRowsFn = (
  cols,
  rowHeight,
  { columnWidth, itemHeight, itemWidth }
) => {
  const resultCols = Math.max(
    1,
    Math.min(cols, Math.round(itemWidth / columnWidth))
  );

  return {
    cols: resultCols,
    rows: Math.max(
      1,
      resultCols === cols ? 1 : Math.round(itemHeight / rowHeight)
    ),
  };
};

//* Custom Hooks
export function useDndHandles<T extends { id: string }>(
  ...[
    items,
    cols,
    rowHeight,
    { onResize, onResort },
  ]: Types.DndHandlesHookArgs<T>
): Types.DndHandlesHookReturnType {
  const listRef = useRef<HTMLUListElement>(null);
  const recordRef = useRef<Types.SizeRecord>();

  return [
    listRef,
    {
      onDragStart: ({ active }) => {
        const { id } = active as { id: string };
        const rect = listRef.current?.getBoundingClientRect();
        const el = document.getElementById(id.replace(/^resize-/, ''));

        if (id.startsWith('resize-') && rect && el) {
          console.log(el.offsetHeight);

          recordRef.current = {
            el,
            columnWidth: rect.width / cols,
            itemHeight: el.offsetHeight,
            itemWidth: el.offsetWidth,
            x: 0,
            y: 0,
          };
        }
      },
      onDragMove: ({ delta }) => {
        const { current: record } = recordRef;

        if (record) {
          const diffx = delta.x - (record.x || 0);
          const diffy = delta.y - (record.y || 0);

          record.x = delta.x;
          record.y = delta.y;
          record.itemWidth = record.itemWidth + diffx;
          record.itemHeight = record.itemHeight + diffy;

          const grid = getColsAndRows(cols, rowHeight, record);

          record.el.style.cssText = `
            height: ${record.itemHeight}px !important;
            grid-column-end: span ${grid.cols};
            grid-row-end: span ${grid.rows};
          `;
        }
      },
      onDragEnd: ({ active, over }) => {
        const { current: record } = recordRef;

        if (record) {
          const item = items.find(
            (item) => item.id === record.el.id
          ) as (typeof items)[number];

          onResize?.(item, getColsAndRows(cols, rowHeight, record));

          record.el.style.removeProperty('height');
          recordRef.current = undefined;
        } else if (active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over?.id);

          onResort?.(arrayMove(items, activeIndex, overIndex));
        }
      },
    },
  ];
}
