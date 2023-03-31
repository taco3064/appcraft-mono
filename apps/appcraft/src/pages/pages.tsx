import { HierarchyEditorButton } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';

export default function Pages() {
  const [nt] = useFixedT('nav');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-pages')}
      action={
        <HierarchyEditorButton
          mode="add"
          data={{ category: 'pages', type: 'group' }}
        />
      }
    >
      Pages
    </PageContainer>
  );
}
