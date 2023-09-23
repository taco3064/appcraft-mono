import Button from '@mui/material/Button';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import type { FormEvent } from 'react';

import CommonButton from '../CommonButton';
import { useFixedT } from '~appcraft/hooks';
import type { AnchorLinksButtonProps, Links } from './AnchorLinksButton.types';

export default function AnchorLinksButton({
  CommonButtonProps,
  btnVariant = 'icon',
  value,
  onCancel,
  onConfirm,
}: AnchorLinksButtonProps) {
  const [at, wt] = useFixedT('app', 'websites');
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState<Links>(value);

  const handleClose = () => {
    setOpen(false);
    setLinks(undefined);
    onCancel?.();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formdata = new FormData(e.target as HTMLFormElement);

    e.preventDefault();
    onConfirm(links);
    setOpen(false);
    setLinks(undefined);
  };

  return (
    <>
      <CommonButton
        {...(CommonButtonProps as object)}
        btnVariant={btnVariant}
        text={wt('btn-links')}
        icon={<InsertLinkIcon />}
        onClick={() => setOpen(true)}
      />

      <CraftsmanStyle.FlexDialog
        fullWidth
        direction="column"
        maxWidth="xs"
        title={wt('btn-links')}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        action={
          <>
            <Button color="inherit" onClick={handleClose}>
              {at('btn-cancel')}
            </Button>

            <Button type="submit" color="primary">
              {at('btn-confirm')}
            </Button>
          </>
        }
      >
        Link Handlers
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
