import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { DataSource } from '@appcraft/types';

import { ConfigDetail, ConfigDetailAction } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useFixedT, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [dst] = useFixedT('data-sources');
  const [action, setAction] = useState<Partial<ConfigDetailAction>>(null);
  const [{ data: names }, superiors] = useSuperiors(category, id);

  const { data: datasource } = useQuery({
    queryKey: [id],
    queryFn: findConfig<DataSource>,
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
        key={id}
        typeName="DataSource"
        typeFile="./node_modules/@appcraft/types/src/services/data-source.types.d.ts"
        _id={id}
        category={category}
        content={datasource}
        superiors={{ names, paths: superiors }}
        onActionNodePick={({ reset, save, ...nodes }) => {
          setAction({ reset, save });

          return nodes;
        }}
      />
    </PageContainer>
  );
}
