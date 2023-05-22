import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import * as Hooks from '~appcraft/hooks';
import { PageContainer } from '~appcraft/styles';
import { WidgetEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';

export default function Detail() {
  const { pathname, query } = useRouter();
  const height = Hooks.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [wt] = Hooks.useFixedT('widgets');
  const { names, breadcrumbs } = Hooks.useSuperiors(category, id);

  const [action, handleActionNodePick] = Hooks.useNodePickHandle([
    'expand',
    'reset',
    'save',
  ]);

  const { data: widget, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<object>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      id={id}
      maxWidth={false}
      title={wt('ttl-detail', { name: names[id] })}
      action={
        <>
          {action?.expand}
          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {wt('ttl-detail', { name: names[id] })}</title>
      </Head>

      <WidgetEditor
        data={widget}
        superiors={{ names, breadcrumbs }}
        onActionNodePick={handleActionNodePick}
        PersistentDrawerContentProps={{
          disableGutters: true,
          maxWidth: false,
          height: (theme) => `calc(${height} - ${theme.spacing(30.25)})`,
        }}
      />
    </PageContainer>
  );
}
