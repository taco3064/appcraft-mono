import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import WebIcon from '@mui/icons-material/Web';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import * as Hook from '~appcraft/hooks';
import Breadcrumbs from '../Breadcrumbs';
import { CommonButton, PageList } from '~appcraft/components';
import { SizedDrawer } from '~appcraft/styles';
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
  const [edited, setEdited] = useState<'app' | 'page'>('app');
  const [website, handleWebsite] = Hook.useWebsiteValues({ data, onSave });

  const { data: pages } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['pages', { type: 'item' }],
  });

  const actionNode = Hook.useNodePicker(
    () =>
      onActionBasePick({
        switch: (
          <Tooltip title={wt(`ttl-mode-${edited}`)}>
            <CraftsmanStyle.IconSwitch
              value={edited}
              onChange={(value: typeof edited) => setEdited(value)}
              options={{
                app: { icon: ViewQuiltIcon, color: 'success' },
                page: { icon: WebIcon, color: 'info' },
              }}
            />
          </Tooltip>
        ),
        expand:
          edited !== 'app' ? null : (
            <CommonButton
              btnVariant="icon"
              icon={<SettingsIcon />}
              text={wt(`btn-expand-${open ? 'off' : 'on'}`)}
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
    [website, open, edited]
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

      <Slide direction="right" in={edited === 'page'}>
        <div>
          {edited === 'page' && (
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
          )}
        </div>
      </Slide>

      <Slide direction="left" in={edited === 'app'}>
        <div>
          {edited === 'app' && <>Website Base Layout Settings</>}

          <SizedDrawer
            anchor="right"
            maxWidth="xs"
            open={open}
            onClose={() => setOpen(false)}
          >
            Drawer
          </SizedDrawer>
        </div>
      </Slide>
    </>
  );
}
