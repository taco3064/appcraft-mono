import Badge from '@mui/material/Badge';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tooltip from '@mui/material/Tooltip';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import { GapTypography, TypeItemAction } from '../../../styles';
import { MenuDialog } from '../MenuDialog';
import { useDisplayPropName } from '../../../hooks';
import { useFixedT, useMixedTypeMapping } from '../../../contexts';
import type { TypeItemMixedProps } from './TypeItemMixed.types';

export default function TypeItemMixed({
  action,
  collectionType,
  options,
  renderMatchedField,
  selection,
}: TypeItemMixedProps) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useMixedTypeMapping(
    collectionType,
    'props',
    options.propName as string
  );

  const ct = useFixedT();
  const displayName = useDisplayPropName(options.propName);
  const matched = options.options?.find(({ text }) => text === selected);

  return (
    <>
      {matched ? (
        renderMatchedField(
          matched,
          <>
            <Tooltip title={ct('btn-clear-type')}>
              <IconButton onClick={() => setSelected()}>
                <UndoIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={ct('btn-reset-type')}>
              <IconButton onClick={() => setOpen(true)}>
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      ) : (
        <ListItemButton onClick={() => setOpen(true)}>
          {selection && <ListItemIcon />}

          <ListItemText
            disableTypography
            primary={
              <GapTypography variant="subtitle1" color="text.primary">
                <Badge
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  badgeContent={
                    <HelpOutlineIcon fontSize="small" color="warning" />
                  }
                >
                  <BookmarkBorderIcon color="secondary" />
                </Badge>

                {displayName}
              </GapTypography>
            }
          />

          {action && (
            <TypeItemAction onClick={(e) => e.stopPropagation()}>
              {action}
            </TypeItemAction>
          )}
        </ListItemButton>
      )}

      {Array.isArray(options.options) && (
        <MenuDialog
          value={selected}
          open={open}
          onChange={setSelected}
          onClose={() => setOpen(false)}
          options={options.options
            ?.sort(({ type: t1, text: p1 }, { type: t2, text: p2 }) => {
              const s1 = `${t1}:${p1}`;
              const s2 = `${t2}:${p2}`;

              return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
            })
            .map(({ type, text }) => ({
              primary: type,
              secondary: text.replace(/import\s*\(.*?\)\s*;?\./g, ''),
              value: text,
            }))}
        />
      )}
    </>
  );
}
