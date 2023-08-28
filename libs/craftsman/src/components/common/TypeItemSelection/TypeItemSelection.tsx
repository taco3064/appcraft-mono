import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';

import * as Types from './TypeItemSelection.types';

export default function TypeItemSelection({
  checked,
  options,
  onSelect,
}: Types.TypeItemSelectionProps) {
  return (
    <ListItemIcon onClick={(e) => e.stopPropagation()}>
      <Checkbox
        color="primary"
        checked={checked}
        onChange={(e) => onSelect(e.target.checked, options)}
      />
    </ListItemIcon>
  );
}
