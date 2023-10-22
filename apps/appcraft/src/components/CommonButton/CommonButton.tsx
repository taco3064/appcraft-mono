import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import type * as Mui from '@mui/material';

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
          {...(props as Mui.ButtonProps)}
          {...{ [`${iconPosition}Icon`]: icon }}
        >
          {text}
        </Button>
      );

    case 'icon': {
      return (
        <Tooltip title={text}>
          <span>
            <IconButton {...(props as Mui.IconButtonProps)}>{icon}</IconButton>
          </span>
        </Tooltip>
      );
    }

    case 'menu': {
      return (
        <MenuItem {...(props as Mui.MenuItemProps)}>
          <ListItemIcon>{icon}</ListItemIcon>

          <ListItemText primary={text} />
        </MenuItem>
      );
    }

    default:
      return null;
  }
}
