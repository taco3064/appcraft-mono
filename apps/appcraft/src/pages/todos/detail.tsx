import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type * as Appcraft from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { PageContainer } from '~appcraft/styles';
import { TodoEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';

export default function Detail() {
  const { pathname, query } = useRouter();
  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [tt] = Hook.useFixedT('todos');
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [action, handleActionNodePick] = Hook.useNodePickHandle([
    'run',
    'reset',
    'save',
  ]);

  const { data: todos, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<Record<string, Appcraft.WidgetTodo>>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={tt('ttl-detail', { name: superiors[id] })}
      action={
        <>
          {action?.run}
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {tt('ttl-detail', { name: superiors[id] })}</title>
      </Head>

      <TodoEditor
        data={todos}
        superiors={{ names: superiors, breadcrumbs }}
        onActionNodePick={handleActionNodePick}
        onSave={refetch}
        ContentProps={{
          sx: {
            height: (theme) => `calc(${height} - ${theme.spacing(30.25)})`,
          },
        }}
      />
    </PageContainer>
  );
}
