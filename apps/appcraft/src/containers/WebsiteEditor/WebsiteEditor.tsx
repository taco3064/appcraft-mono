import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import WebIcon from '@mui/icons-material/Web';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { Breakpoint } from '@mui/material/styles';

import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Style from '~appcraft/styles';
import Breadcrumbs from '../Breadcrumbs';
import { searchHierarchy } from '~appcraft/services';
import type { WebsiteEditorProps } from './WebsiteEditor.types';

export default function WebsiteEditor({
  data,
  superiors,
  onActionAddPick,
  onActionBasePick = (e) => e,
  onSave,
}: WebsiteEditorProps) {
  const [at, wt] = Hook.useFixedT('app', 'websites');
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<'app' | 'page'>('app');
  const [website, handleWebsite] = Hook.useWebsiteValues({ data, onSave });

  const width = Hook.useWidth();
  const height = Hook.useHeight();

  const { data: pages } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['pages', { type: 'item' }],
  });

  const { data: palettes } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['themes'],
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
                app: { icon: ViewQuiltIcon, color: 'warning' },
                page: { icon: WebIcon, color: 'info' },
              }}
            />
          </Tooltip>
        ),
        expand:
          edited !== 'app' ? null : (
            <Comp.CommonButton
              btnVariant="icon"
              icon={<SettingsIcon />}
              text={wt(`btn-expand-${open ? 'off' : 'on'}`)}
              onClick={() => setOpen(!open)}
            />
          ),
        reset: (
          <Comp.CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handleWebsite.reset}
          />
        ),
        save: (
          <Comp.CommonButton
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
          ToolbarProps={{
            disableGutters: true,
          }}
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
            <Comp.NavList
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
              title={
                <Style.WebsiteTitle
                  variant="outlined"
                  color="primary"
                  TypographyProps={{
                    variant: width === 'xs' ? 'subtitle1' : 'h6',
                  }}
                >
                  {wt('ttl-mode-page')}
                </Style.WebsiteTitle>
              }
            />
          )}
        </div>
      </Slide>

      <Slide direction="left" in={edited === 'app'}>
        <div>
          {edited === 'app' && (
            <>
              <Toolbar
                disableGutters
                variant="dense"
                style={{}}
                sx={(theme) => ({
                  userSelect: 'none',
                  [theme.breakpoints.only('xs')]: {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                })}
              >
                <Style.WebsiteTitle
                  variant="outlined"
                  color="primary"
                  TypographyProps={{
                    variant: width === 'xs' ? 'subtitle1' : 'h6',
                  }}
                >
                  {wt('ttl-mode-app')}
                </Style.WebsiteTitle>

                <Comp.BreakpointStepper
                  value={breakpoint}
                  onChange={setBreakpoint}
                />
              </Toolbar>

              <Style.ScreenSimulator
                maxWidth={breakpoint}
                minHeight={(theme) => `calc(${height} - ${theme.spacing(42)})`}
                render={(scale) => (
                  <Comp.WebsitePreview
                    options={website}
                    scale={scale}
                    title={superiors.names[data._id]}
                  />
                )}
              />
            </>
          )}

          <Style.SizedDrawer
            anchor="right"
            maxWidth="xs"
            open={open}
            onClose={() => setOpen(false)}
          >
            <Comp.WebsiteLayoutEditor
              palettes={palettes}
              value={website}
              onBack={() => setOpen(false)}
              onChange={handleWebsite.change}
            />
          </Style.SizedDrawer>
        </div>
      </Slide>
    </>
  );
}
