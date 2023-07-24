import * as React from 'react';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import _set from 'lodash/set';
import { FormEvent } from 'react';

import { FlexDialog } from '../../styles';
import type * as Types from './MutationStateDialog.types';

const TABS: Types.TabValue[] = ['props', 'nodes', 'todos'];

export default function MutationStateDialog({
  ct,
  open,
  values,
  onClose,
  onConfirm,
}: Types.MutationStateDialogProps) {
  const { state } = values || {};
  const [, setTransition] = React.useTransition();
  const [active, setActive] = React.useState<Types.TabValue>(TABS[0]);

  return (
    <FlexDialog
      {...{ open, onClose }}
      disableContentJustifyCenter
      fullWidth
      maxWidth="xs"
      direction="column"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTransition(() => {
          onClose(e, 'escapeKeyDown');
          onConfirm(_set(values, 'state', { ...state }));
        });
      }}
      action={
        <>
          <Button onClick={(e) => onClose(e, 'escapeKeyDown')}>
            {ct('btn-cancel')}
          </Button>

          <Button type="submit" color="primary">
            {ct('btn-confirm')}
          </Button>
        </>
      }
    >
      <Tabs
        variant="fullWidth"
        value={active}
        onChange={(_e, newActive) => setActive(newActive)}
      >
        {TABS.map((value) => (
          <Tab key={value} label={ct(`ttl-state-${value}`)} value={value} />
        ))}
      </Tabs>
    </FlexDialog>
  );
}
