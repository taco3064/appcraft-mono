import Badge from '@mui/material/Badge';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import * as Hooks from '../../hooks';
import { GapTypography, IconTipButton, TypeItemAction } from '../../styles';
import { MenuDialog } from '../common';
import type { TypeItemMixedProps } from './TypeItemMixed.types';

export default function TypeItemMixed({
  action,
  disabled = false,
  label,
  options,
  propPath,
  renderMatchedField,
  selection,
}: TypeItemMixedProps) {
  const [selected, setSelected] = Hooks.useMixedTypeMapping(propPath);
  const [open, setOpen] = useState(false);
  const ct = Hooks.useFixedT();
  const matched = options.options?.find(({ text }) => text === selected);

  return (
    <>
      {matched ? (
        renderMatchedField(
          matched,
          <>
            <IconTipButton
              disabled={disabled}
              title={ct('btn-clear-type')}
              onClick={() => setSelected()}
            >
              <UndoIcon />
            </IconTipButton>

            <IconTipButton
              disabled={disabled}
              title={ct('btn-reset-type')}
              onClick={() => setOpen(true)}
            >
              <PlaylistAddCheckIcon />
            </IconTipButton>
          </>
        )
      ) : (
        <ListItemButton
          disableRipple={disabled}
          disableTouchRipple={disabled}
          onClick={() => !disabled && setOpen(true)}
        >
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

                {label}
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
