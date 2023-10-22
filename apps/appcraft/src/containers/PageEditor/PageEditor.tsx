import * as Exhibitor from '@appcraft/exhibitor';
import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Toolbar from '@mui/material/Toolbar';
import { Suspense, useEffect, useImperativeHandle, useRef } from 'react';

import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Style from '~appcraft/styles';
import Breadcrumbs from '../Breadcrumbs';
import WidgetPicker from '../WidgetPicker';
import type * as Types from './PageEditor.types';

export default function PageEditor({
  ResponsiveDrawerProps,
  data,
  superiors,
  onActionNodePick = (e) => e,
  onOutputCollect,
  onSave,
}: Types.PageEditorProps) {
  const [
    { active, breakpoint, layouts, maxWidthes, readyTodos, refresh },
    handlePage,
  ] = Hook.usePageValues({
    data,
    onSave,
  });

  const [at, pt] = Hook.useFixedT('app', 'pages');
  const editingRef = useRef<boolean>();
  const handleFetch = Hook.useCraftsmanFetch();
  const isSettingOpen = Boolean(layouts[active]);
  const maxWidth = Exhibitor.useBreakpointValue(maxWidthes, breakpoint);
  const width = Exhibitor.useWidth();

  //* Nodes
  const LazyLayoutPropsEditor =
    Exhibitor.useLazyWidgetNav<Types.LazyLayoutPropsEditorProps>(
      layouts[active] ? [layouts[active]] : [],
      handleFetch.wrapper,
      ({ fetchData, ...props }) => (
        <Comp.LayoutPropsEditor {...props} getWidgetOptions={fetchData} />
      )
    );

  const maxWidthSelect = (
    <Comp.MaxWidthSelect
      size="small"
      variant={width === 'xs' ? 'filled' : 'outlined'}
      breakpoint={breakpoint}
      sx={{ width: width === 'xs' ? '100%' : 240 }}
      value={maxWidth.matched}
      onChange={({ target }) =>
        handlePage.change('maxWidthes', {
          ...maxWidthes,
          [breakpoint]: target.value,
        })
      }
    />
  );

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        add: (
          <Comp.CommonButton
            btnVariant="icon"
            disabled={breakpoint !== 'xs'}
            icon={<AddIcon />}
            text={pt('btn-add')}
            onClick={handlePage.add}
          />
        ),
        ready: (
          <Comp.ReadyTodoEditor
            layouts={layouts}
            value={readyTodos}
            onConfirm={(value) => handlePage.change('readyTodos', value)}
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
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handlePage.save}
            disabled={
              !layouts.length || layouts.some((layout) => !layout.template?.id)
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
                renderPicker={(options) => <WidgetPicker {...options} />}
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
              sx={{ height: '100%', overflow: 'auto', marginBottom: 3 }}
            >
              <Container
                disableGutters
                maxWidth={false}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  width:
                    width === breakpoint
                      ? '100%'
                      : __WEBPACK_DEFINE__.CONTAINER_WIDTH[breakpoint],
                }}
              >
                <Exhibitor.CraftedRenderer
                  key={refresh}
                  elevation={1}
                  options={layouts}
                  onFetchData={handleFetch.data}
                  onFetchWrapper={handleFetch.wrapper}
                  onReady={readyTodos}
                  onOutputCollect={(...e) =>
                    !editingRef.current && onOutputCollect(...e)
                  }
                  CollectionGridProps={{
                    breakpoint,
                    maxWidthes,
                    cols: __WEBPACK_DEFINE__.COLLECTION_COLS,
                    rowHeight: __WEBPACK_DEFINE__.COLLECTION_ROW_HEIGHT,
                    onResize: handlePage.resize,
                    onResort: (items) => handlePage.change('layouts', items),
                    renderAction: (layout) => (
                      <Comp.LayoutAction
                        layout={layout}
                        onEdit={handlePage.active}
                        onRemove={handlePage.remove}
                        onWidgetChange={(id) => {
                          layouts.splice(layouts.indexOf(layout), 1, {
                            ...layout,
                            template: { id },
                          });

                          handlePage.change('layouts', [...layouts]);
                        }}
                        widgetPicker={
                          <WidgetPicker
                            fullWidth
                            name="widget"
                            label={pt('lbl-widget')}
                            value={layout.template?.id}
                          />
                        }
                      />
                    ),
                  }}
                />
              </Container>
            </Container>

            {width === 'xs' && maxWidthSelect}

            <AppBar
              position="static"
              color="default"
              sx={(theme) => ({
                marginTop: theme.spacing(1),
                borderRadius: `${theme.spacing(2.5)} / 50%`,
              })}
            >
              <Toolbar variant="dense">
                {width !== 'xs' && maxWidthSelect}

                <Comp.BreakpointStepper
                  value={breakpoint}
                  onChange={handlePage.breakpoint}
                  disableNextButton={layouts.length === 0}
                />
              </Toolbar>
            </AppBar>
          </>
        }
      />
    </>
  );
}
