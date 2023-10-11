import { useRouter } from 'next/router';

import { AppLayout } from '~appcraft/containers';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';

export default withPerPageLayout(AppLayout, function WebsiteIndex() {
  const { config } = useWebsiteConfig();

  console.log(config);

  return (
    <>
      <div>Index</div>
    </>
  );
});
