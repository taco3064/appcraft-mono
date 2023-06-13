import Badge from '@mui/material/Badge';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import { GapTypography, IconTipButton, TypeItemAction } from '../../../styles';
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
            <IconTipButton
              title={ct('btn-clear-type')}
              onClick={() => setSelected()}
            >
              <UndoIcon />
            </IconTipButton>

            <IconTipButton
              title={ct('btn-reset-type')}
              onClick={() => setOpen(true)}
            >
              <PlaylistAddCheckIcon />
            </IconTipButton>
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
