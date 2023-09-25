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
        {/**
         //* 條列出所有可具有連結的事件，點擊後：
         //* 1. 選擇綁定其他頁面 URL
         //* 2. 選擇要變成 URL Search Params 的 Output

         //? 待解決的問題：
         //? 1. 必須想辦法在產生 options 時就先行取得 Output，以便後續選擇
         //? 2. 目標連結頁面接收到 URL Search Params 後，如何將其轉換成 props ?
        */}
        {open && (
          <Suspense fallback={<LinearProgress />}>
            <LazyAnchorLinksList layouts={layouts} />
          </Suspense>
        )}
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
