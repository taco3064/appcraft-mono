import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { WebsiteConfig } from '@appcraft/types';

import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks/common';
import { useHierarchyFilter, useNodePickHandle } from '~appcraft/hooks';

const CONFIG_DETAIL_ACTIONS = ['reset', 'save'];

export default function Detail() {
  const [at, wt] = useFixedT('app', 'websites');
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = useHierarchyFilter(category, id);

  const [action, handleActionNodePick] = useNodePickHandle(
    CONFIG_DETAIL_ACTIONS
  );

  const { data: website, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<WebsiteConfig>,
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
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {wt('ttl-detail')}</title>
      </Head>
    </PageContainer>
  );
}
