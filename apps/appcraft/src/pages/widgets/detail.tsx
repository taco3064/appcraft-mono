import Button from '@mui/material/Button';
import Head from 'next/head';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import type { OutputCollectEvent } from '@appcraft/exhibitor';
import type { MainWidget, WidgetTodo } from '@appcraft/types';

import * as Ctr from '~appcraft/containers';
import * as Hook from '~appcraft/hooks';
import { CommonButton, TodoOutputStepper } from '~appcraft/components';
import { CraftsmanOverrideProvider } from '~appcraft/contexts';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { withPerPageLayout } from '~appcraft/hocs';
import type { HierarchyData } from '~appcraft/services';

const TODO_ACTIONS = ['expand', 'run', 'reset', 'save'];
const WIDGET_ACTIONS = ['expand', 'reset', 'save'];

export default withPerPageLayout(Ctr.ArtisanLayout, function Detail() {
  const [at, wt, tt] = Hook.useFixedT('app', 'widgets', 'todos');
  const { enqueueSnackbar } = useSnackbar();
  const { pathname, query } = useRouter();
  const [output, setOutput] = useState<OutputCollectEvent>();
  const [todoHierarchy, setTodoHierarchy] = useState<HierarchyData<string>>();

  const theme = useTheme();
  const height = Hook.useHeight();
  const handleFetch = Hook.useCraftsmanFetch();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [widgetAction, handleWidgetActionPick] =
    Hook.useNodePickHandle(WIDGET_ACTIONS);

  const [todoAction, handleTodoActionPick] =
    Hook.useNodePickHandle(TODO_ACTIONS);

  const { data: widget, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  const { data: todoWrapper } = useQuery({
    queryKey: [todoHierarchy?._id],
    queryFn: findConfig<Record<string, WidgetTodo>>,
    refetchOnWindowFocus: false,
  });

  return (
    <CraftsmanOverrideProvider
      hierarchyid={id}
      options={Ctr.getOverrideRender({
        onFetchData: handleFetch.data,
        onFetchWrapper: handleFetch.wrapper,
        onTodoView: setTodoHierarchy,
        onWidgetView: (data) =>
          global.window?.open(`/widgets/detail?id=${data._id}`, '_blank'),
      })}
    >
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="lg"
        primary={wt('ttl-detail')}
        secondary={superiors[id]}
        action={
          <>
            {widgetAction?.expand}
            {widgetAction?.reset}
            {widgetAction?.save}
          </>
        }
      >
        <Head>
          <title>Appcraft | {wt('ttl-detail')}</title>
        </Head>

        <Ctr.WidgetEditor
          data={widget}
          superiors={{ names: superiors, breadcrumbs }}
          onActionNodePick={handleWidgetActionPick}
          onSave={refetch}
          onOutputCollect={(e, eventName) =>
            enqueueSnackbar(tt('msg-event-outputs', { name: eventName }), {
              variant: 'info',
              action: () => (
                <Button color="inherit" onClick={() => setOutput(e)}>
                  {at('btn-confirm')}
                </Button>
              ),
            })
          }
          ResponsiveDrawerProps={{
            disableGutters: true,
            maxWidth: false,
            height: (theme) => `calc(${height} - ${theme.spacing(29)})`,
          }}
        />
      </PageContainer>

      <CraftsmanStyle.FlexDialog
        disableContentGutter
        disableContentJustifyCenter
        fullWidth
        maxWidth="xs"
        direction="column"
        title={tt('ttl-output')}
        open={Boolean(output)}
        onClose={() => setOutput(undefined)}
      >
        {output && <TodoOutputStepper {...output} />}
      </CraftsmanStyle.FlexDialog>

      <CraftsmanStyle.FlexDialog
        disableContentGutter
        disableContentPadding
        fullScreen
        direction="column"
        open={Boolean(todoHierarchy)}
        onClose={() => setTodoHierarchy(undefined)}
        title={{
          primary: todoHierarchy?.name,
          secondary: todoHierarchy?.description,
        }}
        action={Object.entries(todoAction || {}).map(([key, action]) =>
          !action || /^(reset|expand)$/.test(key) ? null : (
            <CommonButton
              {...action.props}
              key={key}
              btnVariant="text"
              size="large"
              color={key === 'save' ? 'secondary' : 'inherit'}
            />
          )
        )}
      >
        {todoHierarchy && (
          <Ctr.TodoEditor
            data={todoWrapper}
            logZIndex={theme.zIndex.modal + 1}
            onActionNodePick={handleTodoActionPick}
            onSave={() => setTodoHierarchy(undefined)}
            ResponsiveDrawerProps={{
              disableGutters: true,
              maxWidth: false,
              height: () => '100%',
            }}
          />
        )}
      </CraftsmanStyle.FlexDialog>
    </CraftsmanOverrideProvider>
  );
});
