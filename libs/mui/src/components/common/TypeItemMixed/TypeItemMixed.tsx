import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import * as Hooks from '../../../hooks';
import * as Styles from '../../../styles';
import { MenuDialog } from '..';
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
  const [selected, setSelected] = Hooks.useMixedTypeMapping(
    propPath,
    options.options || []
  );

  const [open, setOpen] = useState(false);
  const ct = Hooks.useFixedT();
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
            <Styles.IconTipButton
              disabled={disabled}
              title={ct('btn-clear-type')}
              onClick={() => setSelected()}
            >
              <UndoIcon />
            </Styles.IconTipButton>

            <Styles.IconTipButton
              disabled={disabled}
              title={ct('btn-reset-type')}
              onClick={() => setOpen(true)}
            >
              <PlaylistAddCheckIcon />
            </Styles.IconTipButton>
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
              <Styles.GapTypography variant="subtitle1" color="text.primary">
                <Styles.CompositeIcon
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  primaryProps={{ color: 'secondary' }}
                  secondaryProps={{ color: 'warning' }}
                  primary={BookmarkBorderIcon}
                  secondary={HelpOutlineIcon}
                />

                {label}
              </Styles.GapTypography>
            }
          />

          {action && <Styles.TypeItemAction>{action}</Styles.TypeItemAction>}
        </ListItemButton>
      )}

      <MenuDialog
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
