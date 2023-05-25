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
import Tooltip from '@mui/material/Tooltip';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import { TypeItemAction } from '../../styles';
import { useFixedT, useMixedTypeMapping } from '../../contexts';
import { useTypeCategory } from '../../hooks';
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
  const [mixedType, setMixedType] = useMixedTypeMapping(options.propName);
  const ct = useFixedT();
  const category = useTypeCategory(options);

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
    case 'Node':
      return <>test</>;
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

    case 'Mixed': {
      const opts = options as Common.MixedFieldProps['options'];
      const mixedOptions = opts.options?.find(({ text }) => text === mixedType);
      const horizontal = mixedType ? 'right' : 'center';

      return (
        <>
          {!mixedOptions ? (
            <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              {selection}

              <ListItemText
                disableTypography
                primary={<Common.MixedField options={opts} />}
              />

              {actions}
            </ListItemButton>
          ) : (
            <TypeItem
              {...{ disableSelection, onDisplayItemClick, onItemRemove }}
              options={mixedOptions}
              action={
                <>
                  <Tooltip title={ct('btn-clear-type')}>
                    <IconButton onClick={() => setMixedType()}>
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
