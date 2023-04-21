import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

import { Typography } from './TypeFields.styles';
import type { DisplayFieldProps } from './TypeFields.types';

export default function DisplayField({ options }: DisplayFieldProps) {
  return (
    <Typography variant="subtitle1" color="text.primary">
      {options.type === 'func' ? (
        <DeviceHubIcon />
      ) : options.type === 'arrayOf' ? (
        <DataArrayIcon />
      ) : (
        <DataObjectIcon />
      )}

      {options.propName}
    </Typography>
  );
}
