import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import _get from 'lodash/get';
import { useMemo, useState } from 'react';
import { useDndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import type * as Appcraft from '@appcraft/types';

import * as Style from '../../styles';
import { WidgetEvent, WidgetNode } from '../common';
import { sortPropPaths } from '../../utils';
import { useLocalesContext } from '../../contexts';
import type { MixedWidget, WidgetElementProps } from './WidgetElement.types';

export default function WidgetElement<I extends Appcraft.EntityWidgets>({
  basePaths,
  event,
  index,
  item,
  node,
  superiorNodeType,
  onClick,
  onEventActive,
  onNodeActive,
  onRemove,
}: WidgetElementProps<I>) {
  const { active } = useDndContext();
  const { category, description, type, content } = item as MixedWidget;
  const [open, setOpen] = useState(true);
  const ct = useLocalesContext();
  const isNode = category === 'node';

  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: item.id });

  const events: string[] = useMemo(
    () => (Array.isArray(event) ? sortPropPaths(event) : []),
    [event]
  );

  const nodes = useMemo<[string, Appcraft.NodeType][]>(
    () => sortPropPaths(Object.entries(node || {}), (e) => e[0]),
    [node]
  );

  const [display, setDisplay] = useState<'events' | 'nodes'>(() =>
    nodes.length > 0 ? 'nodes' : 'events'
  );

  return (
    <>
      <ListItemButton
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        selected={open}
        style={{ transition, transform: `translateY(${transform?.y || 0}px)` }}
        onClick={() =>
          onClick([
            ...basePaths,
            ...(superiorNodeType === 'node' ? [index] : []),
          ])
        }
      >
        <ListItemIcon>
          {nodes.length > 0 && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </ListItemIcon>

        <ListItemText
          {...(isNode
            ? { primary: type, secondary: description }
            : { primary: ct('ttl-node-plain-text'), secondary: content })}
          primaryTypographyProps={{
            fontWeight: 'bolder',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        />

        <Style.TypeItemAction>
          {open && nodes.length > 0 && events.length > 0 && (
            <Tooltip title={ct(`btn-${display}`)}>
              <Style.WidgetNodeSwitch value={display} onChange={setDisplay} />
            </Tooltip>
          )}

          <Style.IconTipButton
            title={ct('btn-remove-widget')}
            onClick={() =>
              onRemove([
                ...basePaths,
                ...(superiorNodeType === 'node' ? [index] : []),
              ])
            }
          >
            <CloseIcon />
          </Style.IconTipButton>
        </Style.TypeItemAction>
      </ListItemButton>

      <Collapse
        in={open && nodes.length > 0 && display === 'nodes'}
        sx={(theme) => ({
          opacity: active ? theme.palette.action.disabledOpacity : 1,
        })}
      >
        {nodes.map(([path, type]) => (
          <WidgetNode
            {...{ path, type }}
            key={path}
            defined={Boolean(_get(item, ['nodes', path]))}
            elementName={type}
            onActive={onNodeActive}
            completePaths={[
              ...basePaths,
              ...(superiorNodeType === 'node' ? [index] : []),
              'nodes',
              path,
            ]}
          />
        ))}
      </Collapse>

      <Collapse in={open && events.length > 0 && display === 'events'}>
        {events.map((path) => (
          <WidgetEvent
            key={path}
            elementName={type}
            path={path}
            onActive={onEventActive}
            completePaths={[
              ...basePaths,
              ...(superiorNodeType === 'node' ? [index] : []),
              'todos',
              path,
            ]}
          />
        ))}
      </Collapse>
    </>
  );
}
