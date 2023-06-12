import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { ConfigOptions } from '@appcraft/types';

import { ConfigDetail } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useFixedT, useNodePickHandle, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [dst] = useFixedT('data-sources');
  const [action, handleActionNodePick] = useNodePickHandle(['reset', 'save']);
  const { names, breadcrumbs } = useSuperiors(category, id);

  const { data: datasource } = useQuery({
    queryKey: [id],
    queryFn: findConfig<ConfigOptions>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={dst('ttl-detail', { name: names[id] })}
      action={
        <>
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {dst('ttl-detail', { name: names[id] })}</title>
      </Head>

      <ConfigDetail
        key={`${id}:${datasource.timestamp}`}
        typeName="DataSource"
        typeFile="./node_modules/@appcraft/types/src/services/data-source.types.d.ts"
        data={datasource}
        superiors={{ names, breadcrumbs }}
        onActionNodePick={handleActionNodePick}
      />
    </PageContainer>
  );
}
