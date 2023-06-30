import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Hooks from '../../hooks';
import { IconTipButton, TypeItemAction } from '../../styles';
import type { WidgetNodeProps } from './WidgetNode.types';

type MixedWidget = Appcraft.PlainTextWidget & Appcraft.NodeWidget;

export default function WidgetNode<I extends Appcraft.WidgetOptions>({
  event,
  fixedT,
  item,
  structure,
  onActive,
  onClick,
  onRemove,
}: WidgetNodeProps<I>) {
  const ct = Hooks.useFixedT(fixedT);
  const { category, description, type, content } = item as MixedWidget;
  const isNode = category === 'node';
  const [open, setOpen] = useState(false);

  const events: string[] = useMemo(() => {
    if (Array.isArray(event)) {
      return event.sort((n1, n2) => {
        const s1 =
          (n1.match(/\./g) || []).length - (n2.match(/\./g) || []).length;

        return s1 || (n1 > n2 ? 1 : n1 < n2 ? -1 : 0);
      });
    }

    return [];
  }, [event]);

  const structures: [string, Appcraft.NodeType][] = useMemo(
    () =>
      Object.entries(structure || {}).sort(([n1], [n2]) => {
        const s1 =
          (n1.match(/\./g) || []).length - (n2.match(/\./g) || []).length;

        return s1 || (n1 > n2 ? 1 : n1 < n2 ? -1 : 0);
      }),
    [structure]
  );

  console.log(events);

  return (
    <>
      <ListItemButton selected={open} onClick={() => onClick(item)}>
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
          primaryTypographyProps={{
            fontWeight: 'bolder',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          {...(isNode
            ? { primary: type, secondary: description }
            : { primary: ct('ttl-node-plain-text'), secondary: content })}
        />

        <TypeItemAction onClick={(e) => e.stopPropagation()}>
          <IconTipButton
            title={ct('btn-remove-widget')}
            onClick={() => onRemove(item)}
          >
            <CloseIcon />
          </IconTipButton>
        </TypeItemAction>
      </ListItemButton>

      {structures.length > 0 && (
        <Collapse in={open}>
          {structures.map(([path, type]) => (
            <ListItemButton key={path} onClick={() => onActive(type, path)}>
              <ListItemIcon />

              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                secondaryTypographyProps={{ variant: 'caption' }}
                primary={path}
                secondary={type}
              />
            </ListItemButton>
          ))}
        </Collapse>
      )}
    </>
  );
}
