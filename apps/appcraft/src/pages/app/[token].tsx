import { AppLayout } from '~appcraft/containers';
import { withPerPageLayout } from '~appcraft/hocs';

export default withPerPageLayout(AppLayout, function App() {
  return (
    <>
      <div>TEST</div>
    </>
  );
});
