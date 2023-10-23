import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import WebIcon from '@mui/icons-material/Web';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { CraftedRenderer, useWidth } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { Breakpoint } from '@mui/material/styles';

import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Style from '~appcraft/styles';
import ExplorerLayout from '../ExplorerLayout';
import Breadcrumbs from '../Breadcrumbs';
import { findConfig, searchHierarchy } from '~appcraft/services';
import { getRoute } from '~appcraft/contexts';
import type * as Types from './WebsiteEditor.types';
import type { PageData } from '~appcraft/hooks';

//* Components
export default function WebsiteEditor({
  data,
  superiors,
  onActionAddPick,
  onActionBasePick = (e) => e,
  onSave,
}: Types.WebsiteEditorProps) {
  const [at, wt] = Hook.useFixedT('app', 'websites');
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<'app' | 'page'>('app');
  const [website, handleWebsite] = Hook.useWebsiteValues({ data, onSave });

  const width = useWidth();
  const height = Hook.useHeight();
  const fetchHandles = Hook.useCraftsmanFetch();
  const homepage = getRoute(website.homeid, website.pages);

  //* Fetch Data
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

  const { data: home } = useQuery({
    enabled: Boolean(homepage?.pageid),
    queryKey: [homepage?.pageid],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  //* Action Nodes
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
        <div
          style={{
            height: edited === 'page' ? '100%' : 0,
            overflow: 'hidden auto',
          }}
        >
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
                  sx={{ display: width === 'xs' ? 'none' : null }}
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
        <div
          style={{
            height: edited === 'app' ? '100%' : 0,
            overflow: 'hidden auto',
          }}
        >
          {edited === 'app' && (
            <>
              <Toolbar
                disableGutters
                variant="dense"
                style={{}}
                sx={(theme) => ({
                  position: 'sticky',
                  userSelect: 'none',
                  top: 0,
                  zIndex: theme.zIndex.appBar,
                  background: theme.palette.background.default,

                  [theme.breakpoints.only('xs')]: {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                })}
              >
                <Style.WebsiteTitle
                  variant="outlined"
                  color="primary"
                  sx={{ display: width === 'xs' ? 'none' : null }}
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
                  <ExplorerLayout
                    disableCssBaseline
                    scale={scale}
                    override={{
                      token: '',
                      userid: '',
                      title: superiors.names[data._id],
                      website,
                    }}
                  >
                    <Container
                      disableGutters
                      sx={{
                        overflow: 'hidden auto',
                        maxWidth:
                          __WEBPACK_DEFINE__.CONTAINER_WIDTH[website.maxWidth],
                      }}
                    >
                      {home?.content && (
                        <CraftedRenderer
                          elevation={1}
                          options={home.content.layouts}
                          onFetchData={fetchHandles.data}
                          onFetchWrapper={fetchHandles.wrapper}
                          onReady={home.content.readyTodos}
                          CollectionGridProps={{
                            breakpoint,
                            maxWidthes: home.content.maxWidthes,
                            cols: __WEBPACK_DEFINE__.COLLECTION_COLS,
                            rowHeight: __WEBPACK_DEFINE__.COLLECTION_ROW_HEIGHT,
                          }}
                        />
                      )}
                    </Container>
                  </ExplorerLayout>
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
