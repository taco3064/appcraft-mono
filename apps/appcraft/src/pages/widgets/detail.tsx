import Head from 'next/head';
import { Style } from '@appcraft/mui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { RootNodeWidget, WidgetTodo } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { CommonButton } from '~appcraft/components/common';
import { PageContainer } from '~appcraft/styles';
import { TodoEditor } from '~appcraft/containers';
import { WidgetEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';

const WIDGET_ACTIONS = ['expand', 'reset', 'save'];
const WRAP_ACTIONS = ['expand', 'run', 'reset', 'save'];

export default function Detail() {
  const [wt] = Hook.useFixedT('widgets');
  const { pathname, query } = useRouter();
  const [wrapId, setWrapId] = useState<string>();

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
    queryKey: [wrapId],
    queryFn: findConfig<Record<string, WidgetTodo>>,
    refetchOnWindowFocus: false,
  });

  console.log(wrapAction);

  return (
    <>
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="lg"
        title={wt('ttl-detail', { name: superiors[id] })}
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
          onWrapTodoView={setWrapId}
          PersistentDrawerContentProps={{
            disableGutters: true,
            maxWidth: false,
            height: (theme) => `calc(${height} - ${theme.spacing(30.25)})`,
          }}
        />
      </PageContainer>

      <Style.FlexDialog
        fullScreen
        title="Title"
        direction="column"
        open={Boolean(wrapId)}
        onClose={() => setWrapId(undefined)}
        action={Object.entries(wrapAction || {}).map(([key, action]) => {
          if (
            !/^(reset|expand)$/.test(key) &&
            typeof action === 'object' &&
            'props' in action
          ) {
            const { props } = action;

            return (
              <CommonButton
                {...props}
                key={key}
                btnVariant="text"
                size="large"
                color={key === 'save' ? 'secondary' : 'inherit'}
              />
            );
          }

          return null;
        })}
      >
        {wrapId && (
          <TodoEditor
            data={wrapTodo}
            onActionNodePick={handleWrapActionPick}
            onSave={() => setWrapId(undefined)}
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
