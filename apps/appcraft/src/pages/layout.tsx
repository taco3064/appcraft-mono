import * as Dnd from '@dnd-kit/core';
import * as Sortable from '@dnd-kit/sortable';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import HeightIcon from '@mui/icons-material/Height';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Toolbar from '@mui/material/Toolbar';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import type { Breakpoint } from '@mui/material/styles';
import type { ImageListItemProps } from '@mui/material/ImageListItem';

import { useWidth } from '~appcraft/hooks';

//* Types
interface LayoutItem extends Pick<ImageListItemProps, 'cols' | 'rows'> {
  id: string;
  seq: number;
}

//* Variables
const COLS: Record<Breakpoint, number> = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 6,
  xl: 8,
};

//* Components
function LayoutItem({
  index,
  maxCols,
  onChange,
  ...props
}: LayoutItem & {
  index: number;
  maxCols: number;
  onChange: (e: LayoutItem) => void;
}) {
  const { id, cols, rows, seq } = props;
  const [height, setHeight] = useState<string | number>('100%');

  const { setNodeRef, attributes, listeners, transition, transform } =
    Sortable.useSortable({ id });

  return (
    <ImageListItem
      {...{ cols, rows }}
      key={id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: transform && `translate(${transform.x}px, ${transform.y}px)`,
        resize: 'both',
        overflow: 'auto',
        order: index,
      }}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
      })}
      onResize={(e) => console.log(e)}
    >
      <div
        style={{
          width: '100%',
          overflow: 'hidden auto',
          height: '100%',
          minHeight: 48,
        }}
      >
        <div style={{ height }}>
          {seq} - {id}
        </div>
        <br />
        <IconButton
          onClick={() =>
            setHeight((typeof height === 'string' ? 100 : height) + 100)
          }
        >
          <HeightIcon />
        </IconButton>
        <IconButton onClick={() => onChange({ ...props, rows: rows + 1 })}>
          <SwapVertIcon />
        </IconButton>
        <IconButton
          onClick={() => onChange({ ...props, rows: Math.max(1, rows - 1) })}
        >
          <VerticalAlignCenterIcon />
        </IconButton>
        <IconButton
          style={{ transform: 'rotate(90deg)' }}
          onClick={() =>
            onChange({ ...props, cols: Math.min(maxCols, cols + 1) })
          }
        >
          <SwapVertIcon />
        </IconButton>
        <IconButton
          style={{ transform: 'rotate(90deg)' }}
          onClick={() => onChange({ ...props, cols: Math.max(1, cols - 1) })}
        >
          <VerticalAlignCenterIcon />
        </IconButton>
      </div>
    </ImageListItem>
  );
}

export default function LayoutPage() {
  const width = useWidth();
  const [items, setItems] = useState<LayoutItem[]>([]);

  const sensors = Dnd.useSensors(
    Dnd.useSensor(Dnd.MouseSensor, {
      activationConstraint: {
        distance: 10,
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
    <Container maxWidth={false}>
      <Toolbar disableGutters>
        <IconButton
          onClick={() =>
            setItems([
              ...items,
              { id: nanoid(6), cols: 1, rows: 1, seq: items.length + 1 },
            ])
          }
        >
          <AddIcon />
        </IconButton>
      </Toolbar>

      <Dnd.DndContext
        sensors={sensors}
        onDragEnd={({ active, over }) => {
          if (active.id !== over?.id) {
            const activeIndex = items.findIndex(({ id }) => id === active.id);
            const overIndex = items.findIndex(({ id }) => id === over?.id);

            setItems(Sortable.arrayMove(items, activeIndex, overIndex));
          }
        }}
      >
        <Sortable.SortableContext
          items={items}
          strategy={Sortable.rectSortingStrategy}
        >
          <ImageList variant="masonry" gap={8} cols={COLS[width]}>
            {items.map((itemProps, index) => (
              //* Layout 相關的設定：cols, rows, content's min-height / max-height
              <LayoutItem
                key={itemProps.id}
                index={index}
                maxCols={COLS[width]}
                {...itemProps}
                onChange={(newItem) => {
                  items.splice(index, 1, newItem);
                  setItems([...items]);
                }}
              />
            ))}
          </ImageList>
        </Sortable.SortableContext>
      </Dnd.DndContext>
    </Container>
  );
}
