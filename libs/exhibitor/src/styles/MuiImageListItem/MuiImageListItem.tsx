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
    GridProps,
    PaperProps,
    action,
    children,
    classes: { fitHeight: fhClassName, ...classes } = {},
    id,
    layouts,
    onResize,
    ...props
  }: Types.CollectionItemProps) => {
    const { active } = useDndContext();
    const { matched } = useBreakpointValue(layouts, GridProps.breakpoint);
    const activeId = active?.id.toString().replace('resize-', '');

    const { type: ResizeHandle, props: resizeHandleProps } =
      DragHandle?.resize || {};

    const { type: ResortHandle, props: resortHandleProps } =
      DragHandle?.resort || {};

    const resizable = useDraggable({
      id: `resize-${id}`,
    });

    const { transition, transform, ...sortable } = useSortable({
      id, //* 維持使用原 ID，可以減少 SortableContext 層的一些轉換處理
    });

    return (
      <ImageListItem
        {...props}
        {...{ id, classes }}
        ref={sortable.setNodeRef}
        cols={matched.cols}
        rows={matched.rows}
        className={cx({
          [fhClassName as string]: GridProps.cols === matched.cols,
        })}
        sx={{
          //* 非拖曳時及拖曳物件的透明度是 1，其他的是 0.6
          opacity: !active || activeId === id ? 1 : 0.6,

          //* 根據 rowHeight 及 rows 計算高度
          height: `${
            GridProps.rowHeight * matched.rows +
            GridProps.gap * (matched.rows - 1)
          }px !important`,

          //* 重新排序時的位移結果
          transition,
          ...(transform && {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
          }),
        }}
      >
        <Paper
          {...PaperProps}
          className={classes?.paper}
          sx={{
            background: 'transparent',
            ...(activeId === id && { height: 'calc(100% - 8px) !important' }),
          }}
        >
          {children}
        </Paper>

        {(DragHandle?.resize || DragHandle?.resort || action) && (
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
      overflow: 'hidden auto',
    },
    fitHeight: {
      height: 'fit-content !important',
      overflow: 'hidden !important',
    },
    paper: {
      width: '100%',
      height: '100%',
      overflow: 'hidden auto',
      transition: theme.transitions.create(['width', 'height']),
    },
    action: {
      position: 'sticky' as never,
      bottom: 0,
      marginTop: 'auto',
      zIndex: theme.zIndex.drawer,

      '& > .title-wrap': {
        padding: 0,

        '& div[role=toolbar]': {
          padding: theme.spacing(0, 2),
          transform: 'scale(0.8) translateX(-12.5%)',
        },
      },
    },
  }),
  { name: 'CollectionItem' }
);
