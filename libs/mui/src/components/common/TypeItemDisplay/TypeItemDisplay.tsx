import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { GapTypography, TypeItemAction } from '../../../styles';
import { usePropValue } from '../../../hooks';
import type { TypeItemDisplayProps } from './TypeItemDisplay.types';

export default function TypeItemDisplay({
  action,
  description,
  disabled = false,
  label,
  options,
  propPath,
  selection,
  onClick,
}: TypeItemDisplayProps) {
  const [{ value, typeFile, typeName }, handlePure] = usePropValue(propPath);

  const override = handlePure.renderOverride?.('display', {
    disabled,
    label,
    options,
    propPath,
    typeFile,
    typeName,
    value,
    onChange: handlePure.change,
  });

  return override === false ? null : (
    <ListItemButton
      disableRipple={disabled}
      onClick={() => !disabled && onClick(options)}
    >
      {selection}

      <ListItemText
        disableTypography
        secondary={description}
        primary={
          override || (
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
          )
        }
      />

      {action && <TypeItemAction>{action}</TypeItemAction>}
    </ListItemButton>
  );
}
