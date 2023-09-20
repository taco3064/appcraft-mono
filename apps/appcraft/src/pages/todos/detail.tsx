import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type * as Appcraft from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { CraftsmanOverrideProvider } from '~appcraft/contexts';
import { PageContainer } from '~appcraft/styles';
import { TodoEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';

const TODO_EDITOR_ACTIONS = ['run', 'reset', 'save'];

export default function Detail() {
  const [tt] = Hook.useFixedT('todos');
  const { pathname, query } = useRouter();

  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [action, handleActionNodePick] =
    Hook.useNodePickHandle(TODO_EDITOR_ACTIONS);

  const { data: todos, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<Record<string, Appcraft.WidgetTodo>>,
    refetchOnWindowFocus: false,
  });

  return (
    <CraftsmanOverrideProvider>
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="lg"
        primary={tt('ttl-detail')}
        secondary={superiors[id]}
        action={
          <>
            {action?.expand}
            {action?.run}
            {action?.reset}
            {action?.save}
          </>
        }
      >
        <Head>
          <title>Appcraft | {tt('ttl-detail')}</title>
        </Head>

        <TodoEditor
          data={todos}
          superiors={{ names: superiors, breadcrumbs }}
          onActionNodePick={handleActionNodePick}
          onSave={refetch}
          ResponsiveDrawerProps={{
            disableGutters: true,
            maxWidth: false,
            height: (theme) => `calc(${height} - ${theme.spacing(29)})`,
          }}
        />
      </PageContainer>
    </CraftsmanOverrideProvider>
  );
}
