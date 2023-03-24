import { PageContainer } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

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
