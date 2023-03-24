import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';

export default function WebSites() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-websites')}
    >
      Websites
    </PageContainer>
  );
}
