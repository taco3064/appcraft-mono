import Container from '@mui/material/Container';
import { TypesEditor } from '@appcraft/mui';
import { useRouter } from 'next/router';

import { Breadcrumbs } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [dst] = useFixedT('data-sources');
  const [{ data: names }, superiors] = useSuperiors(category, id);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={dst('ttl-detail', { name: names[id] })}
    >
      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        onCustomize={(breadcrumbs) => {
          breadcrumbs.splice(
            1,
            1,
            ...superiors.map((superior, i) => ({
              text: names[superior],
              url: {
                pathname: `/${category}`,
                query: {
                  superiors: superiors.slice(0, i + 1),
                },
              },
            }))
          );

          return [...breadcrumbs, { text: names[id] }];
        }}
      />

      <Container maxWidth="sm">
        <TypesEditor />
      </Container>
    </PageContainer>
  );
}
