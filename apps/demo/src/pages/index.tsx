import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useFixedT } from '~demo/hooks';

export default function Index() {
  const [at] = useFixedT('app');

  return (
    <Container maxWidth="lg">
      <Typography paragraph variant="h4" color="secondary">
        Welcome to Appcraft
      </Typography>

      <Typography variant="h6" color="text.primary" whiteSpace="pre-line">
        {at('txt-introduction')}
      </Typography>
    </Container>
  );
}
