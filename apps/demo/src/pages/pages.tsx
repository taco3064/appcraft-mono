import { GroupEditor } from '~demo/components';
import { PageContainer } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

export default function Pages() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-pages')}
      action={<GroupEditor mode="add" type="pages" />}
    >
      Pages
    </PageContainer>
  );
}
