import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { GapTypography } from '../../../styles';
import { useDisplayPropName } from '../../../hooks';
import type { DisplayFieldProps } from './DisplayField.types';

export default function DisplayField({
  action,
  selection,
  options,
  onClick,
}: DisplayFieldProps) {
  const displayName = useDisplayPropName(options.propName);

  return (
    <ListItemButton onClick={() => onClick(options)}>
      {selection}

      <ListItemText
        disableTypography
        primary={
          <GapTypography variant="subtitle1" color="text.primary">
            {options.type === 'func' ? (
              <DeviceHubIcon color="success" />
            ) : options.type === 'arrayOf' ? (
              <DataArrayIcon color="info" />
            ) : (
              <DataObjectIcon color="info" />
            )}

            {displayName}
          </GapTypography>
        }
      />

      {action}
    </ListItemButton>
  );
}
