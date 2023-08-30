import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { CraftsmanStyle } from '@appcraft/craftsman';

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
        <CraftsmanStyle.AppcraftHint title={text} disabled={props.disabled}>
          <IconButton {...(props as IconButtonProps)}>{icon}</IconButton>
        </CraftsmanStyle.AppcraftHint>
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
