import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import cx from 'clsx';
import { useDndContext, useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { withStyles } from 'tss-react/mui';

import { useBreakpointValue } from '../..';
import type * as Types from './MuiImageListItem.types';

export const CollectionItem = withStyles(
  ({
    DragHandle,
    PaperProps,
    action,
    breakpoint,
    children,
    elevation,
    id,
    layouts,
    rowHeight,
    onResize,

    classes: {
      display: displayClassName,
      visibility: visibilityClassName,
      ...classes
    } = {},

    ...props
  }: Types.CollectionItemProps) => {
    const { active } = useDndContext();

    const { type: ResizeHandle, props: resizeHandleProps } =
      DragHandle?.resize || {};

    const { type: ResortHandle, props: resortHandleProps } =
      DragHandle?.resort || {};

    const {
      matched: { hidden, cols, rows },
    } = useBreakpointValue(layouts, breakpoint);

    const resizable = useDraggable({
      id: `resize-${id}`,
    });

    const { transition, transform, ...sortable } = useSortable({
      id, //* 維持使用原 ID，可以減少 SortableContext 層的一些轉換處理
    });

    return (
      <ImageListItem
        {...props}
        {...{ id, classes, cols, rows }}
        ref={sortable.setNodeRef}
        className={cx({
          [displayClassName as string]: hidden === 'display',
          [visibilityClassName as string]: hidden === 'visibility',
        })}
        sx={{
          height: rowHeight * rows,
          opacity: !active || active.id === id ? 1 : 0.6,
          transition,
          ...(transform && {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
          }),
        }}
      >
        <Paper {...PaperProps} className={classes?.paper}>
          {children}
        </Paper>

        {(DragHandle || action) && (
          <ImageListItemBar
            classes={{ root: classes?.action, titleWrap: 'title-wrap' }}
            title={
              <Toolbar role="toolbar" variant="dense">
                {ResortHandle && (
                  <ResortHandle
                    {...resortHandleProps}
                    {...sortable.attributes}
                    {...sortable.listeners}
                  />
                )}

                {action}
              </Toolbar>
            }
            actionIcon={
              ResizeHandle && (
                <ResizeHandle
                  ref={resizable.setNodeRef as never}
                  {...resizeHandleProps}
                  {...resizable.attributes}
                  {...resizable.listeners}
                />
              )
            }
          />
        )}
      </ImageListItem>
    );
  },
  (theme) => ({
    root: {
      overflow: 'hidden',
      transition: theme.transitions.create([
        'width',
        'height',
        'grid-column-end',
        'grid-row-end',
      ]),
    },
    paper: {
      width: '100%',
      height: '100%',
      overflow: 'hidden auto',

      '&.resizing': {
        height: '100% !important',
        overflow: 'hidden !important',
      },
    },
    action: {
      position: 'static' as never,

      '& > .title-wrap': {
        padding: 0,

        '& div[role=toolbar]': {
          padding: theme.spacing(0, 2),
          transform: 'scale(0.8) translateX(-12.5%)',
        },
      },
    },

    //* Hidden
    display: {
      display: 'none',
    },
    visibility: {
      visibility: 'hidden' as never,
    },
  }),
  { name: 'CollectionItem' }
);

{
  /* <DndContext
  onDragStart={() => {
    const ndoeRect = node.current?.getBoundingClientRect();

    setSize(
      ndoeRect && {
        w: ndoeRect.width,
        h: ndoeRect.height,
      }
    );
  }}
  onDragEnd={() => {
    if (resized && size) {
      setSize(undefined);
      setResized(undefined);

      onResize?.({
        curr: _pick(resized, ['w', 'h']),
        prev: _pick(size, ['w', 'h']),
      });
    }
  }}
  onDragMove={({ delta }) => {
    const ndoeRect = node.current?.getBoundingClientRect();

    if (ndoeRect) {
      const diffx = delta.x - (resized?.x || 0);
      const diffy = delta.y - (resized?.y || 0);

      const { w, h } = resized || {
        w: ndoeRect.width,
        h: ndoeRect.height,
      };

      setResized({
        ...delta,
        w: w + diffx,
        h: h + diffy,
      });
    }
  }}
></DndContext>; */
}
