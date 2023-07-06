import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';

import { TinyAvatar } from '../../../styles';
import { statuses } from '../../../hooks';
import * as Types from './TypeItemSelection.types';

export default function TypeItemSelection({
  status,
  onStatusChange,
}: Types.TypeItemSelectionProps) {
  return (
    <ListItemIcon onClick={(e) => e.stopPropagation()}>
      <Checkbox
        color="primary"
        checked={status === 'state'}
        indeterminate={status === 'props'}
        checkedIcon={
          <TinyAvatar variant="square" color="primary">
            S
          </TinyAvatar>
        }
        indeterminateIcon={
          <TinyAvatar variant="square" color="secondary">
            P
          </TinyAvatar>
        }
        onClick={() =>
          onStatusChange(
            statuses[(statuses.indexOf(status) + 1) % statuses.length]
          )
        }
      />
    </ListItemIcon>
  );
}
