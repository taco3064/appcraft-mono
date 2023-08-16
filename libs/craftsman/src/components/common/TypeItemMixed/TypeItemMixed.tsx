import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import * as Hook from '../../../hooks';
import * as Style from '../../../styles';
import MenuDialog from '../MenuDialog';
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
  const [selected, setSelected] = Hook.useMixedTypeMapping(
    propPath,
    options.options || []
  );

  const [open, setOpen] = useState(false);
  const ct = Hook.useFixedT();
  const matched = options.options?.find(({ text }) => text === selected);

  const types =
    options.options?.filter(
      ({ type }) => !/^(func|element|node)$/.test(type)
    ) || [];

  return !types.length ? null : (
    <>
      {matched ? (
        renderMatchedField(
          matched,
          selected as string,
          <>
            <Style.IconTipButton
              disabled={disabled}
              title={ct('btn-clear-type')}
              onClick={() => setSelected()}
            >
              <UndoIcon />
            </Style.IconTipButton>

            <Style.IconTipButton
              disabled={disabled}
              title={ct('btn-reset-type')}
              onClick={() => setOpen(true)}
            >
              <PlaylistAddCheckIcon />
            </Style.IconTipButton>
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
              <Style.GapTypography
                variant="subtitle1"
                color="text.primary"
                sx={(theme) => ({ paddingX: theme.spacing(1.5) })}
              >
                <Style.CompositeIcon
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  primaryProps={{ color: 'secondary' }}
                  secondaryProps={{ color: 'warning' }}
                  primary={BookmarkBorderIcon}
                  secondary={HelpOutlineIcon}
                />

                {label}
              </Style.GapTypography>
            }
          />

          {action && <Style.TypeItemAction>{action}</Style.TypeItemAction>}
        </ListItemButton>
      )}

      <MenuDialog
        title={ct('ttl-select-type')}
        value={selected}
        open={open}
        onChange={setSelected}
        onClose={() => setOpen(false)}
        options={types
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
    </>
  );
}
