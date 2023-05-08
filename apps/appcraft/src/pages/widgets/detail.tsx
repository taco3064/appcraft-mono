import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { WidgetEditor, WidgetEditorAction } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useFixedT, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [wt] = useFixedT('widgets');
  const [action, setAction] = useState<Partial<WidgetEditorAction>>(null);
  const { names, breadcrumbs } = useSuperiors(category, id);

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
        onActionNodePick={({ expand, reset, save, ...nodes }) => {
          setAction({ expand, reset, save });

          return nodes;
        }}
        PersistentDrawerContentProps={{
          disableGutters: true,
          maxWidth: false,
          height: (theme) =>
            `calc(${global.window?.innerHeight || 0}px - ${theme.spacing(
              28.25
            )})`,
        }}
      />
    </PageContainer>
  );
}
