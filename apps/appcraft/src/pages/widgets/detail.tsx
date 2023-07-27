import Button from '@mui/material/Button';
import Head from 'next/head';
import { Style } from '@appcraft/mui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import type { OutputCollectEvent } from '@appcraft/mui';
import type { RootNodeWidget, WidgetTodo } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { CommonButton, TodoOutputStepper } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { TodoEditor, WidgetEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';
import type { HierarchyData } from '~appcraft/services';

const WIDGET_ACTIONS = ['expand', 'reset', 'save'];
const WRAP_ACTIONS = ['expand', 'run', 'reset', 'save'];

export default function Detail() {
  const [at, wt, tt] = Hook.useFixedT('app', 'widgets', 'todos');
  const { enqueueSnackbar } = useSnackbar();
  const { pathname, query } = useRouter();
  const [output, setOutput] = useState<OutputCollectEvent>();
  const [todoHierarchy, setTodoHierarchy] = useState<HierarchyData<string>>();

  const theme = useTheme();
  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [widgetAction, handleWidgetActionPick] =
    Hook.useNodePickHandle(WIDGET_ACTIONS);

  const [todoAction, handleTodoActionPick] =
    Hook.useNodePickHandle(WRAP_ACTIONS);

  const { data: widget, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<RootNodeWidget>,
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
          <title>Appcraft | {wt('ttl-detail', { name: superiors[id] })}</title>
        </Head>

        <WidgetEditor
          data={widget}
          superiors={{ names: superiors, breadcrumbs }}
          onActionNodePick={handleWidgetActionPick}
          onSave={refetch}
          onTodoWrapperView={setTodoHierarchy}
          onWidgetWrapperView={(data) =>
            global.window?.open(`/widgets/detail?id=${data._id}`, '_blank')
          }
          onOutputCollect={(e) =>
            enqueueSnackbar(tt('btn-output'), {
              variant: 'info',
              action: () => (
                <Button color="inherit" onClick={() => setOutput(e)}>
                  {at('btn-confirm')}
                </Button>
              ),
            })
          }
          PersistentDrawerContentProps={{
            disableGutters: true,
            maxWidth: false,
            height: (theme) => `calc(${height} - ${theme.spacing(30.25)})`,
          }}
        />
      </PageContainer>

      <Style.FlexDialog
        fullWidth
        maxWidth="xs"
        direction="column"
        title={tt('ttl-output')}
        open={Boolean(output)}
        onClose={() => setOutput(undefined)}
      >
        {output && <TodoOutputStepper {...output} />}
      </Style.FlexDialog>

      <Style.FlexDialog
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
            PersistentDrawerContentProps={{
              disableGutters: true,
              maxWidth: false,
              height: () => '100%',
            }}
          />
        )}
      </Style.FlexDialog>
    </>
  );
}
