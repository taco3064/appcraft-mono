import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { ConfigOptions } from '@appcraft/types';

import * as Hooks from '~appcraft/hooks';
import { ConfigDetail } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [tt] = Hooks.useFixedT('todos');
  const { superiors, breadcrumbs } = Hooks.useHierarchyFilter(category, id);

  const [action, handleActionNodePick] = Hooks.useNodePickHandle([
    'reset',
    'save',
  ]);

  const { data: datasource } = useQuery({
    queryKey: [id],
    queryFn: findConfig<ConfigOptions>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={tt('ttl-detail', { name: superiors[id] })}
      action={
        <>
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {tt('ttl-detail', { name: superiors[id] })}</title>
      </Head>

      <ConfigDetail
        key={`${id}:${datasource.timestamp}`}
        typeName="DataSource"
        typeFile="./node_modules/@appcraft/types/src/services/data-source.types.d.ts"
        data={datasource}
        superiors={{ names: superiors, breadcrumbs }}
        onActionNodePick={handleActionNodePick}
      />
    </PageContainer>
  );
}
