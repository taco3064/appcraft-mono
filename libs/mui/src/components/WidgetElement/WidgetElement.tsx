import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Style from '../../styles';
import { WidgetEvent, WidgetNode } from '../common';
import { sortPropPaths } from '../../utils';
import type { WidgetElementProps } from './WidgetElement.types';

type MixedWidget = Appcraft.PlainTextWidget & Appcraft.NodeWidget;

export default function WidgetElement<I extends Appcraft.WidgetOptions>({
  basePaths,
  ct,
  event,
  index,
  item,
  structure,
  superiorNodeType,
  onClick,
  onEventActive,
  onNodeActive,
  onRemove,
}: WidgetElementProps<I>) {
  const { category, description, type, content } = item as MixedWidget;
  const isNode = category === 'node';
  const [open, setOpen] = useState(false);

  const events: string[] = useMemo(
    () => (Array.isArray(event) ? sortPropPaths(event) : []),
    [event]
  );

  const structures = useMemo<[string, Appcraft.NodeType][]>(
    () => sortPropPaths(Object.entries(structure || {}), (e) => e[0]),
    [structure]
  );

  const [display, setDisplay] = useState<'events' | 'nodes'>(() =>
    structures.length > 0 ? 'nodes' : 'events'
  );

  return (
    <>
      <ListItemButton
        selected={open}
        onClick={() =>
          onClick([
            ...basePaths,
            ...(superiorNodeType === 'node' ? [index] : []),
          ])
        }
      >
        <ListItemIcon>
          {structures.length > 0 && (
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
          {open && structures.length > 0 && events.length > 0 && (
            <Tooltip
              title={ct(`btn-${display === 'events' ? 'todos' : 'nodes'}`)}
            >
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

      <Collapse in={open && structures.length > 0 && display === 'nodes'}>
        {structures.map(([path, type]) => (
          <WidgetNode
            {...{ path, type }}
            key={path}
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
              'events',
              path,
            ]}
          />
        ))}
      </Collapse>
    </>
  );
}
