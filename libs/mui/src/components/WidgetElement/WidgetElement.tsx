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
import type * as Appcraft from '@appcraft/types';

import * as Style from '../../styles';
import { WidgetEvent, WidgetNode } from '../common';
import { sortPropPaths } from '../../utils';
import { useSortableDnd } from '../../hooks';
import type { MixedWidget, WidgetElementProps } from './WidgetElement.types';

const DND_TYPE = Symbol('widget');

export default function WidgetElement<I extends Appcraft.WidgetOptions>({
  basePaths,
  ct,
  defaultOpen,
  event,
  index,
  item,
  node,
  superiorNodeType,
  onClick,
  onDndMove,
  onEventActive,
  onNodeActive,
  onRemove,
}: WidgetElementProps<I>) {
  const { category, description, type, content } = item as MixedWidget;
  const isNode = category === 'node';
  const [open, setOpen] = useState(defaultOpen);

  const { ref, handlerId, isDragging } = useSortableDnd<HTMLDivElement>(
    DND_TYPE,
    item.id,
    index,
    onDndMove
  );

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
        ref={ref}
        selected={open}
        data-handler-id={handlerId}
        style={{ opacity: isDragging ? 0 : 1 }}
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

      <Collapse in={open && nodes.length > 0 && display === 'nodes'}>
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
