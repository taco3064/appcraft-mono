import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ThemeOptions } from '@mui/material/styles';

import { ConfigDetail, ConfigDetailAction } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useFixedT, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [tt] = useFixedT('themes');
  const [action, setAction] = useState<Partial<ConfigDetailAction>>(null);
  const [{ data: names }, superiors] = useSuperiors(category, id);

  const { data: theme } = useQuery({
    queryKey: [id],
    queryFn: findConfig<ThemeOptions>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={tt('ttl-detail', { name: names[id] })}
      action={
        <>
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {tt('ttl-detail', { name: names[id] })}</title>
      </Head>

      <ConfigDetail
        key={`${id}:${theme.timestamp}`}
        typeName="ThemeOptions"
        typeFile="./node_modules/@mui/material/styles/createTheme.d.ts"
        category={category}
        data={theme}
        superiors={{ names, paths: superiors }}
        onActionNodePick={({ reset, save, ...nodes }) => {
          setAction({ reset, save });

          return nodes;
        }}
      />
    </PageContainer>
  );
}
