import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

import type * as Types from './useSortableDnd.types';

export const useSortableDnd = <E extends HTMLElement>(
  ...args: Types.SortableDndHookArgs
): Types.SortableDndHookReturn<E> => {
  const [type, id, index, handleDndMove] = args;
  const ref = useRef<E>(null);

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => ({ id, index }),
    isDragging: (monitor) => id === monitor.getItem().id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: type,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (ref.current) {
        const drag = item as { index: number };
        const { y = 0 } = monitor.getClientOffset() || {};
        const { top, bottom } = ref.current.getBoundingClientRect();
        const hoverIndex = index;
        const hoverMiddleY = (bottom - top) / 2;
        const hoverClientY = y - top;

        if (
          (drag.index < hoverIndex && hoverClientY >= hoverMiddleY) ||
          (drag.index > hoverIndex && hoverClientY <= hoverMiddleY)
        ) {
          handleDndMove(drag.index, hoverIndex);
          drag.index = hoverIndex;
        }
      }
    },
  });

  drag(drop(ref));

  return {
    ref,
    handlerId,
    isDragging,
  };
};
