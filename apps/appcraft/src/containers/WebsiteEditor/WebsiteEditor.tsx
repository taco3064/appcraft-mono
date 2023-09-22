import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import * as Hook from '~appcraft/hooks';
import Breadcrumbs from '../Breadcrumbs';
import { CommonButton, PageList } from '~appcraft/components';
import { ResponsiveDrawer } from '~appcraft/styles';
import { searchHierarchy } from '~appcraft/services';
import type { WebsiteEditorProps } from './WebsiteEditor.types';

export default function WebsiteEditor({
  ResponsiveDrawerProps,
  data,
  superiors,
  onActionAddPick,
  onActionBasePick = (e) => e,
  onSave,
}: WebsiteEditorProps) {
  const [at, wt] = Hook.useFixedT('app', 'websites');
  const [open, setOpen] = useState(false);
  const [website, handleWebsite] = Hook.useWebsiteValues({ data, onSave });

  const width = Hook.useWidth();
  const isCollapsable = /^(xs|sm|md)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const { data: pages } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['pages', { type: 'item' }],
  });

  const actionNode = Hook.useNodePicker(
    () =>
      onActionBasePick({
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
    [website, open, isCollapsable, isSettingOpen]
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
        disablePersistent={/^(xs|sm|md)$/.test(width)}
        open={isSettingOpen}
        onClose={() => setOpen(false)}
        content={
          <PageList
            values={website.pages}
            onChange={(pages) => handleWebsite.change({ ...website, pages })}
            onActionNodePick={onActionAddPick}
            pageOptions={pages.map(
              ({ _id: value, name: primary, description: secondary }) => ({
                value,
                primary,
                secondary,
              })
            )}
          />
        }
        drawer={<div>Drawer</div>}
      />
    </>
  );
}
