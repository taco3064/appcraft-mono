import * as React from 'react';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { FormEvent } from 'react';
import type { WidgetState } from '@appcraft/types';

import { FlexDialog } from '../../styles';
import { useStateGenerator } from '../../hooks';
import type * as Types from './MutationStateDialog.types';

const TABS: WidgetState['category'][] = ['props', 'nodes', 'todos'];

export default function MutationStateDialog({
  ct,
  open,
  typeFile = './node_modules/@appcraft/types/src/widgets/state.types.d.ts',
  values,
  renderEditor,
  onClose,
  onConfirm,
}: Types.MutationStateDialogProps) {
  const [active, setActive] = React.useState<WidgetState['category']>(TABS[0]);

  const [editing, handleState] = useStateGenerator(
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
        //! onConfirm
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

      {editing && renderEditor(editing.config, handleState.change)}
    </FlexDialog>
  );
}
