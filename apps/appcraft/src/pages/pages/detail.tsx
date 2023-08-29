import Button from '@mui/material/Button';
import Head from 'next/head';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import type { OutputCollectEvent } from '@appcraft/exhibitor';
import type { WidgetTodo } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { CommonButton, TodoOutputStepper } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { PageEditor, TodoEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/contexts';
import type { HierarchyData } from '~appcraft/services';
import type { PageData } from '~appcraft/hooks';

const PAGE_ACTIONS = ['add', 'ready', 'reset', 'save'];
const TODO_ACTIONS = ['expand', 'run', 'reset', 'save'];

export default function Detail() {
  const [at, pt, tt] = useFixedT('app', 'pages', 'todos');
  const { enqueueSnackbar } = useSnackbar();
  const { pathname, query } = useRouter();
  const [output, setOutput] = useState<OutputCollectEvent>();
  const [todoHierarchy, setTodoHierarchy] = useState<HierarchyData<string>>();

  const theme = useTheme();
  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [pageAction, handlePageActionPick] =
    Hook.useNodePickHandle(PAGE_ACTIONS);

  const [todoAction, handleTodoActionPick] =
    Hook.useNodePickHandle(TODO_ACTIONS);

  const { data, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  const { data: todoWrapper } = useQuery({
    queryKey: [todoHierarchy?._id],
    queryFn: findConfig<Record<string, WidgetTodo>>,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="xl"
        primary={pt('ttl-detail')}
        secondary={superiors[id]}
        action={
          <>
            {pageAction?.add}
            {pageAction?.ready}
            {pageAction?.reset}
            {pageAction?.save}
          </>
        }
      >
        <Head>
          <title>Appcraft | {pt('ttl-detail')}</title>
        </Head>

        <PageEditor
          data={data}
          superiors={{ names: superiors, breadcrumbs }}
          onActionNodePick={handlePageActionPick}
          onSave={refetch}
          onTodoWrapperView={setTodoHierarchy}
          onWidgetView={(data) =>
            global.window?.open(`/widgets/detail?id=${data._id}`, '_blank')
          }
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
          <TodoEditor
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
    </>
  );
}
