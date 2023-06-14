import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { FormEvent, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { FlexDialog } from '../../styles';
import { useFixedT } from '../../contexts';
import type { WidgetAddDialogProps } from './WidgetAddDialog.types';

export default function WidgetAddDialog({
  disablePlaintext = false,
  fixedT,
  open,
  renderWidgetTypeSelection,
  onClose,
  onConfirm,
}: WidgetAddDialogProps) {
  const ct = useFixedT(fixedT);

  const [active, setActive] =
    useState<Appcraft.WidgetOptions['category']>('node');

  const [data, setData] = useState<Appcraft.WidgetOptions>();

  const handleClose: typeof onClose = (...e) => {
    setActive('node');
    setData(undefined);
    onClose(...e);
  };

  return (
    <FlexDialog
      fullWidth
      maxWidth="xs"
      direction="column"
      open={open}
      onClose={handleClose}
      action={
        <>
          <Button onClick={(e) => handleClose(e, 'escapeKeyDown')}>
            {ct('btn-cancel')}
          </Button>

          <Button type="submit" color="primary">
            {ct('btn-confirm')}
          </Button>
        </>
      }
      PaperProps={
        {
          component: 'form',
          onSubmit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            onConfirm(data as Appcraft.NodeWidget);
            handleClose(e, 'escapeKeyDown');
          },
        } as object
      }
    >
      {!disablePlaintext && (
        <Tabs
          variant="fullWidth"
          value={active}
          onChange={(_e, newActive) => setActive(newActive)}
        >
          <Tab label={ct('ttl-node-widget')} value="node" />

          <Tab
            label={ct('ttl-node-plain-text')}
            value="plainText"
            disabled={disablePlaintext}
          />
        </Tabs>
      )}

      {active === 'node' ? (
        renderWidgetTypeSelection({
          onChange: (e) =>
            setData({ ...e, category: 'node', description: data?.description }),
        })
      ) : (
        <TextField
          autoFocus
          fullWidth
          required
          size="small"
          margin="dense"
          variant="outlined"
          label={ct('lbl-plain-text')}
          defaultValue={(data as Appcraft.PlainTextWidget)?.content || ''}
          onChange={(e) =>
            setData({
              ...(data as Appcraft.PlainTextWidget),
              category: 'plainText',
              content: e.target.value,
            })
          }
        />
      )}

      <TextField
        fullWidth
        size="small"
        margin="dense"
        variant="outlined"
        label={ct('lbl-description')}
        defaultValue={data?.description || ''}
        onChange={(e) =>
          setData({
            ...(data as Appcraft.WidgetOptions),
            description: e.target.value,
          })
        }
      />
    </FlexDialog>
  );
}
