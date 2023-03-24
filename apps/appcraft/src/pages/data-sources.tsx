import { GroupEditor } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';

export default function DataSources() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-datasources')}
      action={<GroupEditor mode="add" type="datasources" />}
    >
      Data Sources
    </PageContainer>
  );
}
