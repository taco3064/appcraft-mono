import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { Website } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { PageContainer } from '~appcraft/styles';
import { WebsiteEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks/common';

const CONFIG_DETAIL_ACTIONS = ['expand', 'add', 'reset', 'save'];

export default function Detail() {
  const [at, wt] = useFixedT('app', 'websites');
  const { pathname, query } = useRouter();

  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [action, handleActionNodePick] = useNodePickHandle(
    CONFIG_DETAIL_ACTIONS
  );

  const { data: website, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<Website>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      primary={wt('ttl-detail')}
      secondary={superiors[id]}
      action={
        <>
          {action?.expand}
          {action?.add}
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {wt('ttl-detail')}</title>
      </Head>

      <WebsiteEditor
        data={website}
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
  );
}
