import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import HierarchyMutationButton from '../HierarchyMutationButton';
import { CommonButton, RemoveButton } from '~appcraft/components';
import { removeHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { HierarchyMutationMenuProps } from './HierarchyMutationMenu.types';

export default function HierarchyMutationMenu({
  data,
  onMoveToSuperiorGroup,
  onSuccess,
}: HierarchyMutationMenuProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);

  const { mutate: handleRemove } = useMutation({
    mutationFn: removeHierarchy,
    onSuccess: () => {
      setAnchorEl(null);
      onSuccess?.('remove');

      enqueueSnackbar(at('msg-succeed-remove'), {
        variant: 'success',
      });
    },
  });

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
        {onMoveToSuperiorGroup && (
          <CommonButton
            btnVariant="menu"
            icon={<ArrowOutwardIcon />}
            text={at('btn-move-to-superior-group')}
            onClick={() => {
              setAnchorEl(null);
              onMoveToSuperiorGroup();
            }}
          />
        )}

        <HierarchyMutationButton
          btnVariant="menu"
          mode="update"
          data={data}
          onCancel={() => setAnchorEl(null)}
          onConfirm={() => {
            setAnchorEl(null);
            onSuccess?.('update');
          }}
        />

        <Divider />

        <RemoveButton
          btnVariant="menu"
          onCancel={() => setAnchorEl(null)}
          onConfirm={() => handleRemove(data._id)}
        />
      </Menu>
    </>
  );
}
