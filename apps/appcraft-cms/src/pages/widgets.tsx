import { GroupEditor } from '~appcraft-cms/components';
import { PageContainer } from '~appcraft-cms/styles';
import { useFixedT } from '~appcraft-cms/hooks';

export default function Widgets() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-widgets')}
      action={<GroupEditor mode="add" type="widgets" />}
    >
      Widgets
    </PageContainer>
  );
}
