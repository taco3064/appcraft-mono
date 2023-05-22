import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

import { GapTypography } from '../../../styles';
import { useDisplayPropName } from '../../../hooks';
import type { DisplayFieldProps } from './DisplayField.types';

export default function DisplayField({ options }: DisplayFieldProps) {
  const displayName = useDisplayPropName(options.propName);

  return (
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
  );
}
