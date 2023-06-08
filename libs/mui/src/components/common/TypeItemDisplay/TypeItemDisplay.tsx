import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { GapTypography, TypeItemAction } from '../../../styles';
import { useDisplayPropName } from '../../../hooks';
import type { TypeItemDisplayProps } from './TypeItemDisplay.types';

export default function TypeItemDisplay({
  action,
  selection,
  options,
  onClick,
}: TypeItemDisplayProps) {
  const displayName = useDisplayPropName(options.propName);

  return (
    <ListItemButton onClick={() => onClick(options)}>
      {selection}

      <ListItemText
        disableTypography
        primary={
          <GapTypography variant="subtitle1" color="text.primary">
            {options.type === 'func' ? (
              <DeviceHubIcon color="secondary" />
            ) : options.type === 'arrayOf' ? (
              <DataArrayIcon color="secondary" />
            ) : (
              <DataObjectIcon color="secondary" />
            )}

            {displayName}
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