import Button from '@mui/material/Button';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinearProgress from '@mui/material/LinearProgress';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { Suspense, useState } from 'react';

import * as Hook from '~appcraft/hooks';
import CommonButton from '../CommonButton';
import AnchorLinksList from '../AnchorLinksList';
import type * as Types from './AnchorLinksButton.types';
import type { Links } from '~appcraft/hooks';

//* Components
export default function AnchorLinksButton({
  CommonButtonProps,
  btnVariant = 'icon',
  pageid,
  pages,
  value,
  onCancel,
  onConfirm,
}: Types.AnchorLinksButtonProps) {
  const [at, wt] = Hook.useFixedT('app', 'websites');
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState<Links>(value.links);
  const handleFetch = Hook.useCraftsmanFetch();
  const linkable = pages.some(({ pathname }) => pathname !== value.pathname);

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
    onCancel?.();
  };

  return (
    <>
      <CommonButton
        {...(CommonButtonProps as object)}
        btnVariant={btnVariant}
        disabled={!linkable}
        text={wt('btn-links')}
        icon={<InsertLinkIcon />}
        onClick={() => setOpen(true)}
      />

      <CraftsmanStyle.FlexDialog
        disableContentJustifyCenter
        disableContentPadding
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
              }}
            >
              {at('btn-confirm')}
            </Button>
          </>
        }
      >
        {open && (
          <Suspense fallback={<LinearProgress />}>
            <LazyAnchorLinksList
              {...{ layouts, pages }}
              value={{ ...value, links }}
              onChange={setLinks}
            />
          </Suspense>
        )}
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
