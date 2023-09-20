import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { Suspense, useEffect, useImperativeHandle, useRef } from 'react';
import { useLazyWidgetNav } from '@appcraft/exhibitor';
import { useTheme } from '@mui/material/styles';

import * as Common from '../common';
import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Style from '~appcraft/styles';
import { CommonButton } from '~appcraft/components/common';
import { WidgetPicker } from '~appcraft/containers/common';
import type * as Types from './PageEditor.types';

export default function PageEditor({
  ResponsiveDrawerProps,
  data,
  superiors,
  onActionNodePick = (e) => e,
  onOutputCollect,
  onSave,
}: Types.PageEditorProps) {
  const [{ active, breakpoint, layouts, readyTodos, refresh }, handlePage] =
    Hook.usePageValues({
      data,
      onSave,
    });

  const [at, pt] = Hook.useFixedT('app', 'pages');
  const theme = useTheme();
  const editingRef = useRef<boolean>();
  const handleFetch = Hook.useCraftsmanFetch();
  const isSettingOpen = Boolean(layouts[active]);

  const LazyLayoutPropsEditor =
    useLazyWidgetNav<Types.LazyLayoutPropsEditorProps>(
      layouts[active] ? [layouts[active]] : [],
      handleFetch.wrapper,
      ({ fetchData, ...props }) => (
        <Common.LayoutPropsEditor {...props} getWidgetOptions={fetchData} />
      )
    );

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        add: (
          <CommonButton
            btnVariant="icon"
            disabled={breakpoint !== 'xs'}
            icon={<AddIcon />}
            text={pt('btn-add')}
            onClick={handlePage.add}
          />
        ),
        ready: (
          <Common.ReadyTodoEditor
            layouts={layouts}
            value={readyTodos}
            onConfirm={(value) => handlePage.change('readyTodos', value)}
          />
        ),
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handlePage.reset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handlePage.save}
            disabled={
              !layouts.length ||
              layouts.some(
                ({ layout, template }) =>
                  !template?.id ||
                  Object.keys(layout).length < theme.breakpoints.keys.length
              )
            }
          />
        ),
      }),
    [breakpoint, layouts, readyTodos]
  );

  useImperativeHandle(editingRef, () => isSettingOpen, [isSettingOpen]);

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
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        ContentProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          },
        }}
        drawer={
          !isSettingOpen ? null : (
            <Suspense fallback={<LinearProgress />}>
              <LazyLayoutPropsEditor
                layouts={layouts}
                value={layouts[active]}
                onClose={() => handlePage.active(undefined)}
                onChange={(value) => {
                  layouts.splice(active, 1, value);
                  handlePage.change('layouts', [...layouts]);
                }}
              />
            </Suspense>
          )
        }
        content={
          <>
            <Container
              disableGutters
              maxWidth={false}
              sx={{ height: '100%', overflow: 'auto' }}
            >
              <CraftedRenderer
                key={refresh}
                breakpoint={breakpoint}
                elevation={1}
                options={layouts}
                onFetchData={handleFetch.data}
                onFetchWrapper={handleFetch.wrapper}
                onReady={readyTodos}
                onOutputCollect={(...e) =>
                  !editingRef.current && onOutputCollect(...e)
                }
                action={(layout, withActionClose) => (
                  <Comp.LayoutAction
                    layout={layout}
                    onCancel={withActionClose()}
                    onEdit={withActionClose(handlePage.active)}
                    onRemove={withActionClose(handlePage.remove)}
                    onWidgetChange={(id) =>
                      withActionClose(() => {
                        layouts.splice(layouts.indexOf(layout), 1, {
                          ...layout,
                          template: { id },
                        });

                        handlePage.change('layouts', [...layouts]);
                      })()
                    }
                    widgetPicker={
                      <WidgetPicker
                        fullWidth
                        name="widget"
                        label={pt('lbl-widget')}
                        value={layout.template?.id}
                      />
                    }
                  />
                )}
                GridLayoutProps={{
                  autoSize: true,
                  cols: Hook.GRID_LAYOUT.COLS,
                  mins: Hook.GRID_LAYOUT.MINS,
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
                marginTop: theme.spacing(1),
                borderRadius: `${theme.spacing(2.5)} / 50%`,
              })}
            >
              <Comp.BreakpointStepper
                value={breakpoint}
                onChange={handlePage.breakpoint}
                disableNextButton={layouts.length === 0}
              />
            </AppBar>
          </>
        }
      />
    </>
  );
}
