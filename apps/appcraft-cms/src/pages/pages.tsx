import { GroupEditor } from '~appcraft-cms/components';
import { PageContainer } from '~appcraft-cms/styles';
import { useFixedT } from '~appcraft-cms/hooks';

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
