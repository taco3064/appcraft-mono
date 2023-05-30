import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import Tooltip from '@mui/material/Tooltip';
import UndoIcon from '@mui/icons-material/Undo';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from 'react';

import { TypeItemAction } from '../../styles';
import { useFixedT } from '../../contexts';
import { useMixedOptions, useTypeCategory } from '../../hooks';
import * as Common from '../common';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  disableSelection = false,
  options,
  onDisplayItemClick,
  onItemRemove,
}: Types.TypeItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const ct = useFixedT();
  const category = useTypeCategory(options);
  const mixed = useMixedOptions(category, options);

  const selection = disableSelection ? null : (
    <ListItemIcon>
      <Checkbox color="primary" />
    </ListItemIcon>
  );

  const actions =
    !action && !onItemRemove ? null : (
      <TypeItemAction onClick={(e) => e.stopPropagation()}>
        {action}

        {onItemRemove && (
          <IconButton onClick={() => onItemRemove(options)}>
            <CloseIcon />
          </IconButton>
        )}
      </TypeItemAction>
    );

  switch (category) {
    case 'Display':
      return (
        <ListItemButton onClick={() => onDisplayItemClick(options)}>
          {selection}

          <ListItemText
            disableTypography
            primary={
              <Common.DisplayField
                options={options as Common.DisplayFieldProps['options']}
              />
            }
          />

          {actions}
        </ListItemButton>
      );

    case 'Pure':
      return (
        <ListItem>
          {selection}

          <ListItemText
            disableTypography
            primary={
              <Common.PureField
                options={options as Common.PureFieldProps['options']}
              />
            }
          />

          {actions}
        </ListItem>
      );

    default:
      return !mixed ? null : (
        <>
          {!mixed.matched ? (
            <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              {selection}

              <ListItemText
                disableTypography
                primary={
                  <Common.MixedField
                    icon={category === 'Mixed' ? QuizOutlinedIcon : WidgetsIcon}
                    options={mixed.propType}
                  />
                }
              />

              {actions}
            </ListItemButton>
          ) : (
            <TypeItem
              {...{ disableSelection, onDisplayItemClick, onItemRemove }}
              options={mixed.matched}
              action={
                <>
                  <Tooltip title={ct('btn-clear-type')}>
                    <IconButton onClick={() => mixed.setSelected()}>
                      <UndoIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={ct('btn-reset-type')}>
                    <IconButton
                      color="warning"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <BookmarkAddedOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />
          )}

          <Menu
            PaperProps={{ elevation: 0 }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: mixed.horizontal }}
            transformOrigin={{ vertical: 'top', horizontal: mixed.horizontal }}
            onClose={() => setAnchorEl(null)}
          >
            {mixed.propType.options
              ?.sort(({ type: t1, text: p1 }, { type: t2, text: p2 }) => {
                const s1 = `${t1}:${p1}`;
                const s2 = `${t2}:${p2}`;

                return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
              })
              .map(({ type, text }, i) => (
                <MenuItem
                  key={text}
                  selected={text === mixed.selected}
                  value={text}
                  onClick={() => {
                    mixed.setSelected(text);
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
}
