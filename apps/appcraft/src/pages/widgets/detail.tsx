import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { RootNodeWidget } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { PageContainer } from '~appcraft/styles';
import { WidgetEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';

export default function Detail() {
  const [wt] = Hook.useFixedT('widgets');
  const { pathname, query } = useRouter();
  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [action, handleActionNodePick] = Hook.useNodePickHandle([
    'expand',
    'reset',
    'save',
  ]);

  const { data: widget, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<RootNodeWidget>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={wt('ttl-detail', { name: superiors[id] })}
      action={
        <>
          {action?.expand}
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {wt('ttl-detail', { name: superiors[id] })}</title>
      </Head>

      <WidgetEditor
        data={widget}
        superiors={{ names: superiors, breadcrumbs }}
        onActionNodePick={handleActionNodePick}
        onSave={refetch}
        PersistentDrawerContentProps={{
          disableGutters: true,
          maxWidth: false,
          height: (theme) => `calc(${height} - ${theme.spacing(30.25)})`,
        }}
      />
    </PageContainer>
  );
}
