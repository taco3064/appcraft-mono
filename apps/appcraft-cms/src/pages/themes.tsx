import { PageContainer } from '~appcraft-cms/styles';
import { useFixedT } from '~appcraft-cms/hooks';

export default function Themes() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-themes')}
    >
      Themes
    </PageContainer>
  );
}
