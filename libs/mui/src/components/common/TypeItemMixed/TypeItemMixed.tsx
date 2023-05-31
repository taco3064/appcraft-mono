import Badge from '@mui/material/Badge';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tooltip from '@mui/material/Tooltip';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import { GapTypography, TypeItemAction } from '../../../styles';
import { useDisplayPropName } from '../../../hooks';
import { useFixedT, useMixedTypeMapping } from '../../../contexts';
import type { TypeItemMixedProps } from './TypeItemMixed.types';

export default function TypeItemMixed({
  action,
  selection,
  options,
  renderMatchedField,
}: TypeItemMixedProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selected, setSelected] = useMixedTypeMapping(options.propName);

  const ct = useFixedT();
  const displayName = useDisplayPropName(options.propName);
  const horizontal = selected ? 'right' : 'center';
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
              <IconButton
                color="secondary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      ) : (
        <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          {selection}

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

      <Menu
        PaperProps={{ elevation: 0 }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal }}
        transformOrigin={{ vertical: 'top', horizontal }}
        onClose={() => setAnchorEl(null)}
      >
        {options.options
          ?.sort(({ type: t1, text: p1 }, { type: t2, text: p2 }) => {
            const s1 = `${t1}:${p1}`;
            const s2 = `${t2}:${p2}`;

            return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
          })
          .map(({ type, text }, i) => (
            <MenuItem
              key={text}
              selected={text === selected}
              value={text}
              onClick={() => {
                setSelected(text);
                setAnchorEl(null);
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontWeight: 'bolder',
                  textTransform: 'capitalize',
                }}
                primary={type}
                secondary={text.replace(/import\s*\(.*?\)\s*;?\./g, '')}
              />
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
