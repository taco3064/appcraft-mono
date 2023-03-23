import { PageContainer } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

export default function Widgets() {
  const [nt, wt] = useFixedT('nav', 'widgets');

  return (
    <PageContainer maxWidth="lg" title={nt('ttl-widgets')}>
      Widgets
    </PageContainer>
  );
}
