import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';

import { TinyAvatar } from '../../../styles';
import { statuses } from '../../../hooks';
import * as Types from './ConstructSelection.types';

export default function ConstructSelection({
  status,
  onStatusChange,
}: Types.ConstructSelectionProps) {
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
