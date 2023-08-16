import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { FormEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import { typeMap } from '@appcraft/widgets';
import { useTheme } from '@mui/material/styles';
import type * as Appcraft from '@appcraft/types';

import { FlexDialog } from '../../styles';
import { WidgetTypeSelect } from '../common';
import { getDefaultProps } from '../../utils';
import { useLocalesContext } from '../../contexts';
import type { MutationNewWidgetDialogProps } from './MutationNewWidgetDialog.types';

export default function MutationNewWidgetDialog({
  disablePlaintext = false,
  open,
  onClose,
  onConfirm,
}: MutationNewWidgetDialogProps) {
  const theme = useTheme();
  const ct = useLocalesContext();
  const [data, setData] = useState<Appcraft.EntityWidgets>();

  const [active, setActive] =
    useState<Appcraft.EntityWidgets['category']>('node');

  const handleClose: typeof onClose = (...e) => {
    setActive('node');
    setData(undefined);
    onClose(...e);
  };

  return (
    <FlexDialog
      disableContentJustifyCenter
      fullWidth
      maxWidth="xs"
      direction="column"
      open={open}
      onClose={handleClose}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onConfirm({ ...(data as Appcraft.EntityWidgets), id: nanoid(4) });
        handleClose(e, 'escapeKeyDown');
      }}
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
        <WidgetTypeSelect
          fullWidth
          required
          size="small"
          margin="dense"
          variant="outlined"
          label={ct('lbl-widget-type')}
          defaultValue=""
          onChange={({ target: { value } }) =>
            setData({
              category: 'node',
              description: data?.description,
              props: getDefaultProps(theme, value),
              type: value,
              typeName: `${value}Props`,
              typeFile: typeMap.get(value) as string,
            } as typeof data)
          }
        />
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
            ...(data as Appcraft.EntityWidgets),
            description: e.target.value,
          })
        }
      />
    </FlexDialog>
  );
}
