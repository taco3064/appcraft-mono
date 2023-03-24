import { NewGroup } from '~demo/components';
import { PageContainer } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

export default function Widgets() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-widgets')}
      action={<NewGroup />}
    >
      Widgets
    </PageContainer>
  );
}