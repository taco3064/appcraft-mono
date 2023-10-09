import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import NextLink from 'next/link';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { findWebsite } from '~appcraft/services';
import type { WebsiteLinkProps } from './WebsiteLink.types';

export default function WebsiteLink({ id }: WebsiteLinkProps) {
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = useQuery({
    enabled,
    queryFn: findWebsite,
    queryKey: [id],
    refetchOnWindowFocus: false,
  });

  return isLoading ? (
    <CircularProgress size={24} />
  ) : !enabled || !data?._id ? (
    <IconButton
      onClick={() => console.log()}
      onContextMenu={() => setEnabled(true)}
    >
      <VisibilityOutlinedIcon />
    </IconButton>
  ) : (
    <IconButton href={`/app/${data._id}`} LinkComponent={NextLink}>
      <VisibilityOutlinedIcon />
    </IconButton>
  );
}
