import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import type { FormEventHandler } from 'react';

import CommonButton from '../CommonButton';
import RemoveButton from '../RemoveButton';
import { useFixedT } from '~appcraft/contexts';
import type { LayoutActionProps } from './LayoutAction.types';

export default function LayoutAction({
  layout,
  widgetPicker,
  onCancel,
  onEdit,
  onRemove,
  onWidgetChange,
}: LayoutActionProps) {
  const [at, pt] = useFixedT('app', 'pages');
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleWidgetSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formdata = new FormData(e.currentTarget);

    e.preventDefault();
    onWidgetChange(formdata.get('widget') as string);
  };

  return (
    <>
      <CommonButton
        btnVariant="icon"
        text={pt('btn-widget-picker')}
        icon={<ExtensionOutlinedIcon />}
        onClick={() => setPickerOpen(true)}
      />

      <CommonButton
        btnVariant="icon"
        disabled={!layout.template.id}
        text={pt('btn-edit')}
        icon={<SettingsOutlinedIcon />}
        onClick={() => onEdit(layout)}
      />

      <Divider flexItem orientation="vertical" />

      <RemoveButton
        btnVariant="icon"
        onConfirm={() => onRemove(layout)}
        onCancel={onCancel}
      />

      <CraftsmanStyle.FlexDialog
        direction="column"
        title={pt('ttl-widget-picker')}
        fullWidth
        maxWidth="xs"
        open={pickerOpen}
        onSubmit={handleWidgetSubmit}
        onClose={() => {
          setPickerOpen(false);
          onCancel?.();
        }}
        action={
          <>
            <Button color="inherit" onClick={() => setPickerOpen(false)}>
              {at('btn-cancel')}
            </Button>

            <Button type="submit" color="primary">
              {at('btn-confirm')}
            </Button>
          </>
        }
      >
        {widgetPicker}
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
