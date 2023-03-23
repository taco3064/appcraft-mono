import { NewWidgetGroup } from '~demo/components';
import { PageContainer } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

export default function Widgets() {
  const [nt, wt] = useFixedT('nav', 'widgets');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-widgets')}
      action={<NewWidgetGroup />}
    >
      Widgets
    </PageContainer>
  );
}
