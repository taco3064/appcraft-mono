import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

import { Breadcrumbs } from '../common';
import { CommonButton } from '~appcraft/components/common';
import { PageList } from '~appcraft/containers/common';
import { ResponsiveDrawer } from '~appcraft/styles';
import { useFixedT, useWidth } from '~appcraft/hooks/common';
import { useNodePicker, useWebsiteValues } from '~appcraft/hooks';
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
  const [website, handleWebsite] = useWebsiteValues({ data, onSave });

  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  console.log(website);

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
            onClick={handleWebsite.reset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handleWebsite.save}
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
        content={
          <PageList
            values={data.content.pages}
            onChange={(pages) => handleWebsite.change({ ...website, pages })}
          />
        }
        drawer={<div>Drawer</div>}
      />
    </>
  );
}
