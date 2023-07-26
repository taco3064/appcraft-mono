import _set from 'lodash/set';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

import type { DndHookArgs, DndHookReturn } from './useDnd.types';

const useDnd = <E extends HTMLElement>(
  ...args: DndHookArgs
): DndHookReturn<E> => {
  const [type, index, handleDndMove] = args;
  const ref = useRef<E>(null);

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { index },
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
        const { index: dragIndex } = item as { index: number };
        const hoverIndex = index;

        if (dragIndex !== hoverIndex) {
          const { top, bottom } = ref.current.getBoundingClientRect();
          const hoverMiddleY = (bottom - top) / 2;
          const { y = 0 } = monitor.getClientOffset() || {};
          const hoverClientY = y - top;

          if (
            (dragIndex < hoverIndex && hoverClientY >= hoverMiddleY) ||
            (dragIndex > hoverIndex && hoverClientY <= hoverMiddleY)
          ) {
            handleDndMove(dragIndex, hoverIndex);
            _set(item as { index: number }, 'index', hoverIndex);
          }
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

export default useDnd;
