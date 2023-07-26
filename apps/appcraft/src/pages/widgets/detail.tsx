import Head from 'next/head';
import { Style } from '@appcraft/mui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import type { RootNodeWidget, WidgetTodo } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { CommonButton, WidgetPropList } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { TodoEditor, WidgetEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';
import type { HierarchyData } from '~appcraft/services';

const WIDGET_ACTIONS = ['expand', 'reset', 'save'];
const WRAP_ACTIONS = ['expand', 'run', 'reset', 'save'];

export default function Detail() {
  const [wt] = Hook.useFixedT('widgets');
  const { pathname, query } = useRouter();

  const theme = useTheme();
  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [view, setView] = useState<{
    type: 'widget' | 'todo';
    data: HierarchyData<string>;
  }>();

  const [widgetAction, handleWidgetActionPick] =
    Hook.useNodePickHandle(WIDGET_ACTIONS);

  const [todoEditorAction, handleTodoEditorActionPick] =
    Hook.useNodePickHandle(WRAP_ACTIONS);

  const { data: widget, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<RootNodeWidget>,
    refetchOnWindowFocus: false,
  });

  const { data: widgetWrapper } = useQuery({
    queryKey: [view?.type === 'widget' && view.data._id],
    queryFn: findConfig<RootNodeWidget>,
    refetchOnWindowFocus: false,
  });

  const { data: todoWrapper } = useQuery({
    queryKey: [view?.type === 'todo' && view.data._id],
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
          onWrapTodoView={(data) => setView({ type: 'todo', data })}
          onWrapWidgetView={(data) => setView({ type: 'widget', data })}
          PersistentDrawerContentProps={{
            disableGutters: true,
            maxWidth: false,
            height: (theme) => `calc(${height} - ${theme.spacing(30.25)})`,
          }}
        />
      </PageContainer>

      <Style.FlexDialog
        disableContentGutter
        disableContentPadding
        fullScreen
        direction="column"
        open={Boolean(view)}
        onClose={() => setView(undefined)}
        title={{
          primary: view?.data?.name,
          secondary: view?.data?.description,
        }}
        action={
          view?.type === 'todo' &&
          Object.entries(todoEditorAction || {}).map(([key, action]) =>
            !action || /^(reset|expand)$/.test(key) ? null : (
              <CommonButton
                {...action.props}
                key={key}
                btnVariant="text"
                size="large"
                color={key === 'save' ? 'secondary' : 'inherit'}
              />
            )
          )
        }
      >
        {view?.type === 'widget' && widgetWrapper && (
          <WidgetPropList widget={widgetWrapper.content} />
        )}

        {view?.type === 'todo' && todoWrapper && (
          <TodoEditor
            data={todoWrapper}
            logZIndex={theme.zIndex.modal + 1}
            onActionNodePick={handleTodoEditorActionPick}
            onSave={() => setView(undefined)}
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
