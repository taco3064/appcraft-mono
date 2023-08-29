import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/contexts';

export default function WebSites() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      primary={nt('ttl-websites')}
    >
      Websites
    </PageContainer>
  );
}
