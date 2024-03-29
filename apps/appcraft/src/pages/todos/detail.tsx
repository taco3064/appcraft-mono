import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type * as Appcraft from '@appcraft/types';

import * as Ctr from '~appcraft/containers';
import * as Hook from '~appcraft/hooks';
import { CraftsmanOverrideProvider } from '~appcraft/contexts';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { withPerPageLayout } from '~appcraft/hocs';

const TODO_EDITOR_ACTIONS = ['run', 'reset', 'save'];

export default withPerPageLayout(Ctr.ArtisanLayout, function Detail() {
  const [tt] = Hook.useFixedT('todos');
  const { pathname, query } = useRouter();

  const handleFetch = Hook.useCraftsmanFetch();
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
    <CraftsmanOverrideProvider
      options={Ctr.getOverrideRender({
        onFetchData: handleFetch.data,
        onFetchWrapper: handleFetch.wrapper,
      })}
    >
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

        <Ctr.TodoEditor
          data={todos}
          superiors={{ names: superiors, breadcrumbs }}
          onActionNodePick={handleActionNodePick}
          onSave={refetch}
          ResponsiveDrawerProps={{
            disableGutters: true,
            maxWidth: false,
          }}
        />
      </PageContainer>
    </CraftsmanOverrideProvider>
  );
});
