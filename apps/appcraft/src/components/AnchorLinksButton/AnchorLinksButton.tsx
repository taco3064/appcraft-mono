import Button from '@mui/material/Button';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinearProgress from '@mui/material/LinearProgress';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { Suspense, useState } from 'react';

import * as Hook from '~appcraft/hooks';
import CommonButton from '../CommonButton';
import AnchorLinksList from '../AnchorLinksList';
import type * as Types from './AnchorLinksButton.types';

//* Components
export default function AnchorLinksButton({
  CommonButtonProps,
  btnVariant = 'icon',
  pageid,
  value,
  onCancel,
  onConfirm,
}: Types.AnchorLinksButtonProps) {
  const [at, wt] = Hook.useFixedT('app', 'websites');
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState<Types.Links>(value);
  const handleFetch = Hook.useCraftsmanFetch();

  const [LazyAnchorLinksList, layouts] =
    Hook.useLazyLayoutsNav<Types.LazyAnchorLinksListProps>(
      open,
      pageid,
      handleFetch.wrapper,
      ({ fetchData, ...props }) => (
        <AnchorLinksList {...props} getWidgetOptions={fetchData} />
      )
    );

  const handleClose = () => {
    setOpen(false);
    setLinks(undefined);
    onCancel?.();
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
        action={
          <>
            <Button color="inherit" onClick={handleClose}>
              {at('btn-cancel')}
            </Button>

            <Button
              color="primary"
              onClick={() => {
                onConfirm(links);
                setOpen(false);
                setLinks(undefined);
              }}
            >
              {at('btn-confirm')}
            </Button>
          </>
        }
      >
        {open && (
          <Suspense fallback={<LinearProgress />}>
            <LazyAnchorLinksList layouts={layouts} />
          </Suspense>
        )}
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
