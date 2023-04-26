import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import { TypeItemAction } from './TypeItem.styles';
import { useMixedTypeMapping } from '../InteractivedContext';
import { useTypeField } from './TypeItem.hooks';
import * as Fields from '../TypeFields';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  disableSelection = false,
  options,
  onDisplayItemClick,
}: Types.TypeItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mixedType, setMixedType] = useMixedTypeMapping(options.propName);
  const category = useTypeField(options);

  const selection = disableSelection ? null : (
    <ListItemIcon>
      <Checkbox color="primary" />
    </ListItemIcon>
  );

  const actions = !action ? null : (
    <TypeItemAction onClick={(e) => e.stopPropagation()}>
      {action}
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
              <Fields.DisplayField
                options={options as Fields.DisplayFieldProps['options']}
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
              <Fields.PureField
                options={options as Fields.PureFieldProps['options']}
              />
            }
          />

          {actions}
        </ListItem>
      );

    case 'Mixed': {
      const opts = options as Fields.MixedFieldProps['options'];
      const mixedOptions = opts.options?.find(({ text }) => text === mixedType);
      const horizontal = mixedType ? 'right' : 'center';

      return (
        <>
          {mixedOptions ? (
            <TypeItem
              {...{ disableSelection, onDisplayItemClick }}
              options={mixedOptions}
              action={
                <>
                  <IconButton onClick={() => setMixedType()}>
                    <UndoIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <BookmarkAddedOutlinedIcon />
                  </IconButton>
                </>
              }
            />
          ) : (
            <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              {selection}

              <ListItemText
                disableTypography
                primary={<Fields.MixedField options={opts} />}
              />

              {actions}
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
            {opts.options
              ?.sort(({ type: t1, text: p1 }, { type: t2, text: p2 }) => {
                const s1 = `${t1}:${p1}`;
                const s2 = `${t2}:${p2}`;

                return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
              })
              .map(({ type, text }, i) => (
                <MenuItem
                  key={text}
                  selected={text === mixedType}
                  value={text}
                  onClick={() => {
                    setMixedType(text);
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
    default:
      return null;
  }
}
