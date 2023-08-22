import Divider from '@mui/material/Divider';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import CommonButton from '../CommonButton';
import RemoveButton from '../RemoveButton';
import { useFixedT } from '~appcraft/hooks';
import type { LayoutActionProps } from './LayoutAction.types';

export default function LayoutAction({ onEdit, onRemove }: LayoutActionProps) {
  const [pt] = useFixedT('pages');

  return (
    <>
      <CommonButton btnVariant="icon" text="Reset" icon={<RestartAltIcon />} />

      <CommonButton
        btnVariant="icon"
        text={pt('btn-edit')}
        icon={<SettingsOutlinedIcon />}
        onClick={onEdit}
      />

      <Divider flexItem orientation="vertical" />

      <RemoveButton btnVariant="icon" onConfirm={onRemove} />
    </>
  );
}
