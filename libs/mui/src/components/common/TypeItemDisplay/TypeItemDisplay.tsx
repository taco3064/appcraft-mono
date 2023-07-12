import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { GapTypography, TypeItemAction } from '../../../styles';
import type { TypeItemDisplayProps } from './TypeItemDisplay.types';

export default function TypeItemDisplay({
  action,
  description,
  disabled = false,
  label,
  options,
  selection,
  onClick,
}: TypeItemDisplayProps) {
  return (
    <ListItemButton
      disableRipple={disabled}
      onClick={() => !disabled && onClick(options)}
    >
      {selection}

      <ListItemText
        disableTypography
        secondary={description}
        primary={
          <GapTypography
            variant="subtitle1"
            color={disabled ? 'text.secondary' : 'text.primary'}
          >
            {options.type === 'func' ? (
              <DeviceHubIcon color={disabled ? 'disabled' : 'secondary'} />
            ) : /^array/.test(options.type) ? (
              <DataArrayIcon color={disabled ? 'disabled' : 'secondary'} />
            ) : (
              <DataObjectIcon color={disabled ? 'disabled' : 'secondary'} />
            )}

            {label}
          </GapTypography>
        }
      />

      {action && (
        <TypeItemAction onClick={(e) => e.stopPropagation()}>
          {action}
        </TypeItemAction>
      )}
    </ListItemButton>
  );
}
