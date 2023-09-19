import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

import { Breadcrumbs } from '../common';
import { CommonButton } from '~appcraft/components/common';
import { ResponsiveDrawer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks/common';
import { useNodePicker, useWidth } from '~appcraft/hooks';
import type { WebsiteEditorProps } from './WebsiteEditor.types';

export default function WebsiteEditor({
  ResponsiveDrawerProps,
  data,
  superiors,
  onActionNodePick,
  onSave,
}: WebsiteEditorProps) {
  const [at, wt] = useFixedT('app', 'websites');
  const [open, setOpen] = useState(false);

  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const actionNode = useNodePicker(
    () =>
      onActionNodePick({
        expand:
          !isCollapsable || isSettingOpen ? null : (
            <CommonButton
              btnVariant="icon"
              icon={<SettingsIcon />}
              text={wt(`btn-expand-${isSettingOpen ? 'off' : 'on'}`)}
              onClick={() => setOpen(!open)}
            />
          ),
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={console.log}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={console.log}
          />
        ),
      }),
    [open, isCollapsable, isSettingOpen]
  );

  return (
    <>
      {superiors && (
        <Breadcrumbs
          ToolbarProps={{ disableGutters: true }}
          action={actionNode}
          onCustomize={([index]) => [
            index,
            ...superiors.breadcrumbs,
            { text: superiors.names[data._id] },
          ]}
        />
      )}

      <ResponsiveDrawer
        {...ResponsiveDrawerProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isSettingOpen}
        onClose={() => setOpen(false)}
        content={<div>Content</div>}
        drawer={<div>Drawer</div>}
      />
    </>
  );
}
