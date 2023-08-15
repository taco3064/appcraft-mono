import Container from '@mui/material/Container';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiContainer.types';

export const FlexContainer = withStyles(
  ({ fullHeight: _fh, ...props }: Types.FlexContainerProps) => (
    <Container {...props} />
  ),
  (_theme, { fullHeight }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column' as never,
      background: 'inherit',
      borderRadius: 'inherit',
      overflow: 'hidden auto',

      ...(fullHeight && {
        height: '100% !important',
      }),
    },
  }),
  { name: 'FullHeightCollapse' }
);
