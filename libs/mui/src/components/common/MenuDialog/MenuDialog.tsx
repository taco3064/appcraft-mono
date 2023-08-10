import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import type { MouseEvent } from 'react';

import { FlexDialog } from '../../../styles';
import type { MenuDialogProps } from './MenuDialog.types';

export default function MenuDialog<V extends { toString(): string }>({
  title,
  options,
  open,
  value: selected = null,
  onChange,
  onClose,
}: MenuDialogProps<V>) {
  const handleSelect = (e: MouseEvent<HTMLLIElement>, value: V) => {
    onChange(value);
    onClose?.(e, 'escapeKeyDown');
  };

  return (
    <FlexDialog
      {...{ title, open, onClose }}
      disableContentPadding
      disableContentGutter
      fullWidth
      maxWidth="xs"
    >
      <MenuList
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          paddingY: theme.spacing(2),
          width: '100%',
          gap: theme.spacing(1),
        })}
      >
        {options.map(({ primary, secondary, value }) => (
          <MenuItem
            key={`${primary}_${value.toString()}`}
            selected={value === selected}
            onClick={(e) => handleSelect(e, value)}
            sx={(theme) => ({
              // borderRadius: theme.spacing(1),
              minHeight: `${theme.spacing(6)} !important`,
            })}
          >
            <ListItemText
              {...{ primary, secondary }}
              primaryTypographyProps={{
                fontWeight: 'bolder',
              }}
              secondaryTypographyProps={{
                whiteSpace: 'pre-wrap',
                style: { wordBreak: 'break-word' },
              }}
            />
          </MenuItem>
        ))}
      </MenuList>
    </FlexDialog>
  );
}
