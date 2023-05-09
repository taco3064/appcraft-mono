import Head from 'next/head';
import { useNodePickHandle } from '@appcraft/mui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { PageContainer } from '~appcraft/styles';
import { WidgetEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';
import { useFixedT, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [wt] = useFixedT('widgets');
  const { names, breadcrumbs } = useSuperiors(category, id);

  const [action, handleActionNodePick] = useNodePickHandle([
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
          height: (theme) =>
            `calc(${global.window?.innerHeight || 0}px - ${theme.spacing(
              30.25
            )})`,
        }}
      />
    </PageContainer>
  );
}
