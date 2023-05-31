import Badge from '@mui/material/Badge';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tooltip from '@mui/material/Tooltip';
import UndoIcon from '@mui/icons-material/Undo';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from 'react';

import { GapTypography, TypeItemAction } from '../../../styles';
import { useDisplayPropName } from '../../../hooks';
import { useFixedT, useMixedTypeMapping } from '../../../contexts';
import type { TypeItemNodeProps } from './TypeItemNode.types';

export default function TypeItemNode({
  action,
  selection,
  options,
}: TypeItemNodeProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selected, setSelected] = useMixedTypeMapping(options.propName);

  const ct = useFixedT();
  const displayName = useDisplayPropName(options.propName);
  const horizontal = selected ? 'right' : 'center';

  const handleTypeSelect = (type: string) => {
    setSelected(type);
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        {selection}

        <ListItemText
          disableTypography
          primary={
            <GapTypography variant="subtitle1" color="text.primary">
              <Badge
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                badgeContent={
                  selected ? null : (
                    <HelpOutlineIcon fontSize="small" color="warning" />
                  )
                }
              >
                <WidgetsIcon color="secondary" />
              </Badge>

              {displayName}
            </GapTypography>
          }
        />

        {(action || selected) && (
          <TypeItemAction onClick={(e) => e.stopPropagation()}>
            <Tooltip title={ct('btn-clear-type')}>
              <IconButton onClick={() => setSelected()}>
                <UndoIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={ct('btn-reset-type')}>
              <IconButton
                color="secondary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>

            {action}
          </TypeItemAction>
        )}
      </ListItemButton>

      <Menu
        PaperProps={{ elevation: 0 }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal }}
        transformOrigin={{ vertical: 'top', horizontal }}
        onClose={() => setAnchorEl(null)}
      >
        {['plain-text', 'widgets', 'array-map'].map((type) => (
          <MenuItem
            key={type}
            selected={selected === type}
            value={type}
            onClick={() => handleTypeSelect(type)}
          >
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 'bolder',
                textTransform: 'capitalize',
              }}
              primary={ct(`ttl-node-${type}`)}
              secondary={ct(`txt-node-${type}`)}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
