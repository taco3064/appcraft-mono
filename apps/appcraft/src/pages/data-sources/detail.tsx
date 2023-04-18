import { useRouter } from 'next/router';

import { Breadcrumbs } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const [dst] = useFixedT('data-sources');
  const [{ data: names }, superiors] = useSuperiors(category);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="sm"
      title={dst('ttl-detail', { name: 'test' })}
    >
      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        onCustomize={(breadcrumbs) => {
          breadcrumbs.splice(
            1,
            1,
            ...superiors.map((id, i) => ({
              text: names[id],
              url: {
                pathname: `/${category}`,
                query: {
                  superiors: superiors.slice(0, i + 1),
                },
              },
            }))
          );

          return [...breadcrumbs, { text: query.id as string }];
        }}
      />
    </PageContainer>
  );
}
