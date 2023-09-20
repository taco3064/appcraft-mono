import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import HierarchyEditorButton from '../HierarchyEditorButton';
import { CommonButton, RemoveButton } from '~appcraft/components/common';
import { removeHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { HierarchyMutationProps } from './HierarchyMutation.types';

export default function HierarchyMutation({
  data,
  onMoveToSuperiorGroup,
  onSuccess,
}: HierarchyMutationProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);

  const mutation = useMutation({
    mutationFn: removeHierarchy,
    onSuccess: () => {
      setAnchorEl(null);
      onSuccess?.();

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

        <HierarchyEditorButton
          btnVariant="menu"
          mode="update"
          data={data}
          onCancel={() => setAnchorEl(null)}
          onConfirm={() => {
            setAnchorEl(null);
            onSuccess?.();
          }}
        />

        <Divider />

        <RemoveButton
          btnVariant="menu"
          onCancel={() => setAnchorEl(null)}
          onConfirm={() => mutation.mutate(data._id)}
        />
      </Menu>
    </>
  );
}