import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import type { NodeType, WidgetOptions } from '@appcraft/types';

import { getDisplayPropName } from '../../hooks';
import { useFixedT } from '../../contexts';
import type { WidgetStructureItemProps } from './WidgetStructureItem.types';

export default function WidgetStructureItem<I extends WidgetOptions>({
  fixedT,
  item,
  structure,
  onClick,
  onNodeSelect,
  onRemove,
}: WidgetStructureItemProps<I>) {
  const ct = useFixedT(fixedT);
  const structures: [string, NodeType][] = Object.entries(structure || {});
  const isNode = item.category === 'node';
  const primary = isNode ? item.type : ct('ttl-node-plain-text');
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton selected={open} onClick={() => onClick(item)}>
        <ListItemIcon
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {structures.length > 0 && (
            <IconButton>
              {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </ListItemIcon>

        <ListItemText primary={primary} secondary={item.description} />

        <ListItemSecondaryAction onClick={(e) => e.stopPropagation()}>
          <Tooltip title={ct('btn-remove-widget')}>
            <IconButton onClick={() => onRemove(item)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItemButton>

      {structures.length > 0 && (
        <Collapse in={open}>
          {structures.map(([path, type]) => (
            <ListItemButton key={path} onClick={() => onNodeSelect(type, path)}>
              <ListItemIcon />

              <ListItemText
                primary={getDisplayPropName(path)}
                secondary={getDisplayPropName(type)}
              />
            </ListItemButton>
          ))}
        </Collapse>
      )}
    </>
  );
}
