import Badge from '@mui/material/Badge';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tooltip from '@mui/material/Tooltip';
import UndoIcon from '@mui/icons-material/Undo';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from 'react';

import { GapTypography, TypeItemAction } from '../../../styles';
import { MenuDialog } from '../MenuDialog';
import { useDisplayPropName } from '../../../hooks';
import { useFixedT, useMixedTypeMapping } from '../../../contexts';
import type { TypeItemNodeProps } from './TypeItemNode.types';

export default function TypeItemNode({
  action,
  selection,
  options,
}: TypeItemNodeProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useMixedTypeMapping(options.propName);

  const ct = useFixedT();
  const displayName = useDisplayPropName(options.propName);

  return (
    <>
      <ListItemButton onClick={() => setOpen(true)}>
        {selection && (selected === 'array-map' ? selection : <ListItemIcon />)}

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
              <IconButton color="secondary" onClick={() => setOpen(true)}>
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>

            {action}
          </TypeItemAction>
        )}
      </ListItemButton>

      <MenuDialog
        options={[
          'plain-text',
          'widgets',
          ...(selection ? ['array-map'] : []),
        ].map((type) => ({
          primary: ct(`ttl-node-${type}`),
          secondary: ct(`txt-node-${type}`),
          value: type,
        }))}
        value={selected}
        open={open}
        onChange={setSelected}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
