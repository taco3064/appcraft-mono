import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import * as Common from '../common';
import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Style from '~appcraft/styles';
import type * as Types from './PageEditor.types';

export default function PageEditor({
  ResponsiveDrawerProps,
  data,
  superiors,
  onActionNodePick = (e) => e,
  onOutputCollect,
  onSave,
  onTodoWrapperView,
  onWidgetWrapperView,
}: Types.PageEditorProps) {
  const [at, pt] = Hook.useFixedT('app', 'pages');

  const [{ active, breakpoint, items }, handlePage] = Hook.usePageValues({
    data,
    onSave,
  });

  const theme = useTheme();
  const rendererFetchHandles = Hook.useRendererFetchHandles();
  const isSettingOpen = Boolean(items[active]);

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        add: (
          <Comp.CommonButton
            btnVariant="icon"
            disabled={breakpoint !== 'xs'}
            icon={<AddIcon />}
            text={at('btn-add')}
            onClick={handlePage.add}
          />
        ),
        reset: (
          <Comp.CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handlePage.reset}
          />
        ),
        save: (
          <Comp.CommonButton
            btnVariant="icon"
            disabled={breakpoint !== 'xl'}
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handlePage.save}
          />
        ),
      }),
    [breakpoint, items]
  );

  useEffect(() => {
    global.window?.dispatchEvent(new Event('resize'));
  }, [breakpoint]);

  return (
    <>
      {superiors && (
        <Common.Breadcrumbs
          ToolbarProps={{ disableGutters: true }}
          action={actionNode}
          onCustomize={([index]) => [
            index,
            ...superiors.breadcrumbs,
            { text: superiors.names[data._id] },
          ]}
        />
      )}

      <Style.ResponsiveDrawer
        {...ResponsiveDrawerProps}
        disablePersistent
        open={isSettingOpen}
        onClose={() => handlePage.active(undefined)}
        drawer={!isSettingOpen ? null : 'Editor Settings'}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        ContentProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          },
        }}
        content={
          <>
            <Container
              disableGutters
              maxWidth={false}
              sx={{ height: '100%', overflow: 'auto' }}
            >
              <CraftedRenderer
                breakpoint={breakpoint}
                elevation={1}
                options={items}
                onFetchData={rendererFetchHandles.data}
                onFetchWrapper={rendererFetchHandles.wrapper}
                onOutputCollect={onOutputCollect}
                action={(layout) => (
                  <Comp.LayoutAction
                    onEdit={() => handlePage.active(layout)}
                    onRemove={() => handlePage.remove(layout)}
                    onWidgetChange={(id) => {
                      items.splice(items.indexOf(layout), 1, {
                        ...layout,
                        template: { id },
                      });

                      handlePage.change([...items]);
                    }}
                    widgetPicker={
                      <Common.WidgetSelect
                        name="widget"
                        label={pt('lbl-widget')}
                        value={layout.template?.id}
                      />
                    }
                  />
                )}
                GridLayoutProps={{
                  autoSize: true,
                  cols: Hook.GRID_LAYOUT_COLS,
                  mins: Hook.GRID_LAYOUT_MINS,
                  isDraggable: true,
                  isResizable: true,
                  resizeHandles: ['se'],
                  onLayoutChange: handlePage.layout,
                  breakpoints: Object.fromEntries(
                    Object.entries(theme.breakpoints.values).sort(
                      ([, w1], [, w2]) => w2 - w1
                    )
                  ),
                  resizeHandle: (
                    <Style.GridLayoutResizeHandle
                      className="react-resizable-handle"
                      sx={(theme) => ({
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        zIndex: theme.zIndex.fab,
                      })}
                    />
                  ),
                }}
              />
            </Container>

            <AppBar
              position="static"
              color="default"
              sx={(theme) => ({
                borderRadius: `${theme.spacing(2.5)} / 50%`,
              })}
            >
              <Comp.BreakpointStepper
                value={breakpoint}
                onChange={handlePage.breakpoint}
                disableNextButton={items.length === 0}
              />
            </AppBar>
          </>
        }
      />
    </>
  );
}
