import Button from '@mui/material/Button';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';

import CommonButton from '../CommonButton';
import { useFixedT, useLinkHandles } from '~appcraft/hooks';
import type { AnchorLinksButtonProps, Links } from './AnchorLinksButton.types';

export default function AnchorLinksButton({
  CommonButtonProps,
  btnVariant = 'icon',
  pageid,
  value,
  onCancel,
  onConfirm,
}: AnchorLinksButtonProps) {
  const [at, wt] = useFixedT('app', 'websites');
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState<Links>(value);
  const [{ options }] = useLinkHandles(open, pageid);

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
        disabled={!options.length}
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
        <List>
          {options.map(({ todoName, todoPath }) => (
            <ListItemButton key={todoPath}>
              <ListItemText primary={todoName} secondary={todoPath} />
            </ListItemButton>
          ))}
        </List>
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
