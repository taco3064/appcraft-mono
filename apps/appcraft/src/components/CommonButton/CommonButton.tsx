import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import type * as Types from './CommonButton.types';

export default function CommonButton({
  btnVariant,
  text,
  icon,
  iconPosition = 'start',
  ...props
}: Types.CommonButtonProps) {
  switch (btnVariant) {
    case 'text':
      return (
        <Button
          {...(props as ButtonProps)}
          {...{ [`${iconPosition}Icon`]: icon }}
        >
          {text}
        </Button>
      );

    case 'icon': {
      return (
        <Tooltip title={text} {...(props?.disabled && { open: false })}>
          <IconButton {...(props as IconButtonProps)}>{icon}</IconButton>
        </Tooltip>
      );
    }

    case 'menu': {
      return (
        <MenuItem {...(props as MenuItemProps)}>
          <ListItemIcon>{icon}</ListItemIcon>

          <ListItemText primary={text} />
        </MenuItem>
      );
    }

    default:
      return null;
  }
}
