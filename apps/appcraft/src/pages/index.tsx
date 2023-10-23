import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ArtisanLayout } from '~appcraft/containers';
import { useFixedT } from '~appcraft/hooks';
import { withPerPageLayout } from '~appcraft/hocs';

export default withPerPageLayout(ArtisanLayout, function Index() {
  const [at] = useFixedT('app');

  return (
    <Container
      maxWidth="md"
      style={{ maxHeight: '100%', overflow: 'hidden auto' }}
    >
      <AppBar
        position="sticky"
        sx={(theme) => ({ background: theme.palette.background.default })}
      >
        <Typography paragraph variant="h4" color="secondary">
          Welcome to Appcraft
        </Typography>
      </AppBar>

      <Typography variant="h6" color="text.primary" whiteSpace="pre-line">
        {at('txt-introduction')}
      </Typography>
    </Container>
  );
});
