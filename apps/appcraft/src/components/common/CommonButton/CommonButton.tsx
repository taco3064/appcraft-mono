import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import type * as Types from './CommonButton.types';

export default function CommonButton({
  IconProps,
  btnVariant,
  text,
  icon: Icon,
  ...props
}: Types.CommonButtonProps) {
  switch (btnVariant) {
    case 'text':
      return (
        <Button {...(props as ButtonProps)} startIcon={<Icon {...IconProps} />}>
          {text}
        </Button>
      );

    case 'icon': {
      return (
        <Tooltip title={text}>
          <IconButton {...(props as IconButtonProps)}>
            <Icon {...IconProps} />
          </IconButton>
        </Tooltip>
      );
    }

    default:
      return null;
  }
}
