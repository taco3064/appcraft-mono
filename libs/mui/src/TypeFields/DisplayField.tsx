import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

import { GapTypography } from './TypeFields.styles';
import type { DisplayFieldProps } from './TypeFields.types';

export default function DisplayField({ options }: DisplayFieldProps) {
  return (
    <GapTypography variant="subtitle1" color="text.primary">
      {options.type === 'func' ? (
        <DeviceHubIcon color="success" />
      ) : options.type === 'arrayOf' ? (
        <DataArrayIcon color="info" />
      ) : (
        <DataObjectIcon color="info" />
      )}

      {options.propName}
    </GapTypography>
  );
}
