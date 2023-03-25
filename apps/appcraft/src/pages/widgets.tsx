import { HierarchyEditorButton } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';

export default function Widgets() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-widgets')}
      action={
        <HierarchyEditorButton
          mode="add"
          data={{ category: 'widgets', type: 'group' }}
        />
      }
    >
      Widgets
    </PageContainer>
  );
}
