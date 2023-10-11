import { useRouter } from 'next/router';

import { AppLayout } from '~appcraft/containers';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';

export default withPerPageLayout(AppLayout, function App() {
  const config = useWebsiteConfig();

  console.log(useRouter());

  return (
    <>
      <div>TEST</div>
    </>
  );
});
