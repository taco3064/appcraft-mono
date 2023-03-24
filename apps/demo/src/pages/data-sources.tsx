import { NewGroup } from '~demo/components';
import { PageContainer } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

export default function DataSources() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-datasources')}
      action={<NewGroup />}
    >
      Data Sources
    </PageContainer>
  );
}
