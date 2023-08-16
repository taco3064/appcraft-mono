import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

import type * as Types from './useHierarchyDnd.types';

const TYPE: Types.DndType = {
  group: Symbol('group'),
  item: Symbol('item'),
};

export const useHierarchyDnd = <E extends HTMLElement>(
  ...args: Types.HierarchyDndHookArgs
): Types.HierarchyDndHookReturn<E> => {
  const [disableGroupChange, data, handleDnd] = args;
  const ref = useRef<E>(null);

  const [{ isOver }, drop] = useDrop({
    accept: TYPE.item,
    drop: () => data,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: TYPE[data.type],
    item: () => data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<typeof data>();

      if (item && dropResult) {
        handleDnd(item, dropResult._id);
      }
    },
  });

  if (data.type === 'item' && !disableGroupChange) {
    drag(ref);
  } else if (data.type === 'group') {
    drop(ref);
  }

  return {
    ref,

    status:
      data.type === 'item' && isDragging
        ? 'dragging'
        : data.type === 'group' && isOver
        ? 'over'
        : null,
  };
};
