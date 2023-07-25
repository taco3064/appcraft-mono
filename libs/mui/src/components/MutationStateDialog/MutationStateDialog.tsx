import * as React from 'react';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { FormEvent } from 'react';

import { FlexDialog } from '../../styles';
import { useStateGenerator } from '../../hooks';
import type { StateCategory } from '../../utils';
import type * as Types from './MutationStateDialog.types';

const TABS: StateCategory[] = ['props', 'nodes', 'todos'];

export default function MutationStateDialog({
  ct,
  open,
  typeFile = './node_modules/@appcraft/types/src/widgets/state.types.d.ts',
  values,
  renderEditor,
  onClose,
  onConfirm,
}: Types.MutationStateDialogProps) {
  const [active, setActive] = React.useState<StateCategory>(TABS[0]);

  const [{ config, valuesRef }, handleState] = useStateGenerator(
    typeFile,
    active,
    values?.state || {}
  );

  return (
    <FlexDialog
      {...{ open, onClose }}
      disableContentJustifyCenter
      fullWidth
      maxWidth="xs"
      direction="column"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onClose(e, 'escapeKeyDown');
        onConfirm({ ...values, state: valuesRef.current });
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
        onChange={(_e, newActive) => {
          setActive(newActive);
          handleState.active(newActive);
        }}
      >
        {TABS.map((value) => (
          <Tab key={value} label={ct(`ttl-state-${value}`)} value={value} />
        ))}
      </Tabs>

      {renderEditor(config, handleState.change)}
    </FlexDialog>
  );
}
