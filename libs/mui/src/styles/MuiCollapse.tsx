import Collapse, { CollapseProps } from '@mui/material/Collapse';
import { withStyles } from 'tss-react/mui';

export const FullHeightCollapse = (() => {
  interface FullHeightCollapseProps extends CollapseProps {
    fullHeight?: boolean;
  }

  return withStyles(
    ({ fullHeight: _fh, ...props }: FullHeightCollapseProps) => (
      <Collapse {...props} />
    ),
    (theme, { fullHeight, in: open }) => ({
      root: {
        ...(fullHeight && open && { height: '100% !important' }),
      },
      wrapper: {
        height: '100% !important',
      },
      wrapperInner: {
        height: '100% !important',
        overflow: 'hidden auto',
      },
    }),
    { name: 'FullHeightCollapse' }
  );
})();
