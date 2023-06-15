import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import type { MouseEvent } from 'react';

import { FlexDialog } from '../../../styles';
import type { MenuDialogProps } from './MenuDialog.types';

export default function MenuDialog<V extends { toString(): string }>({
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
    <FlexDialog {...{ open, onClose }} fullWidth maxWidth="xs">
      <MenuList
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: (theme) => theme.spacing(1),
        }}
      >
        {options.map(({ primary, secondary, value }) => (
          <MenuItem
            key={`${primary}_${value.toString()}`}
            selected={value === selected}
            onClick={(e) => handleSelect(e, value)}
            sx={{ borderRadius: (theme) => theme.spacing(1) }}
          >
            <ListItemText
              {...{ primary, secondary }}
              primaryTypographyProps={{
                fontWeight: 'bolder',
                textTransform: 'capitalize',
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
