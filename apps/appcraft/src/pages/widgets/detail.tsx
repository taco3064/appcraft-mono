import Head from 'next/head';
import { Style } from '@appcraft/mui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import type { RootNodeWidget, WidgetTodo } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { CommonButton } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { TodoEditor, WidgetEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';
import type { HierarchyData } from '~appcraft/services';

const WIDGET_ACTIONS = ['expand', 'reset', 'save'];
const WRAP_ACTIONS = ['expand', 'run', 'reset', 'save'];

export default function Detail() {
  const [wt] = Hook.useFixedT('widgets');
  const { pathname, query } = useRouter();
  const [todo, setTodo] = useState<HierarchyData<string>>();

  const theme = useTheme();
  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [widgetAction, handleWidgetActionPick] =
    Hook.useNodePickHandle(WIDGET_ACTIONS);

  const [wrapAction, handleWrapActionPick] =
    Hook.useNodePickHandle(WRAP_ACTIONS);

  const { data: widget, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<RootNodeWidget>,
    refetchOnWindowFocus: false,
  });

  const { data: wrapTodo } = useQuery({
    queryKey: [todo?._id],
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
          onWrapTodoView={setTodo}
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
        title={{ primary: todo?.name, secondary: todo?.description }}
        direction="column"
        open={Boolean(todo)}
        onClose={() => setTodo(undefined)}
        action={Object.entries(wrapAction || {}).map(([key, action]) =>
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
        {todo && (
          <TodoEditor
            data={wrapTodo}
            logZIndex={theme.zIndex.modal + 1}
            onActionNodePick={handleWrapActionPick}
            onSave={() => setTodo(undefined)}
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
