import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRef } from 'react';

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
  const ref = useRef<typeof onClick>(onClick);

  const [{ value, props, typeFile, typeName }, handlePure] = usePropValue(
    'display',
    propPath
  );

  const override = handlePure.renderOverride?.('display', {
    displayRef: ref,
    disabled,
    label,
    options,
    propPath,
    typeFile,
    typeName,
    props,
    value,
    onChange: handlePure.change,
  });

  return override === false ? null : (
    <ListItemButton
      disableRipple={disabled}
      onClick={() => !disabled && ref.current(options)}
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
              sx={(theme) => ({ paddingX: theme.spacing(1.5) })}
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
