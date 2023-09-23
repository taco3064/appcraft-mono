import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

import NavMutationButton from '../NavMutationButton';
import RemoveButton from '../RemoveButton';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './NavMutationMenu.types';

export default function NavMutationMenu({
  data,
  pageOptions,
  onChange,
  onRemove,
}: Types.NavMutationMenuProps) {
  const [at] = useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: (theme) => ({
            marginTop: theme.spacing(1),
          }),
        }}
      >
        <NavMutationButton
          btnVariant="menu"
          mode="update"
          data={data}
          options={pageOptions}
          onCancel={() => setAnchorEl(null)}
          onConfirm={(data) => {
            onChange(data);
            setAnchorEl(null);
          }}
        />

        <Divider />

        <RemoveButton
          btnVariant="menu"
          onCancel={() => setAnchorEl(null)}
          onConfirm={onRemove}
        />
      </Menu>
    </>
  );
}
