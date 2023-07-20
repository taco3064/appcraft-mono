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
        borderRadius: 'inherit',
        ...(fullHeight && open && { height: '100% !important' }),
        ...(open && { width: '100% !important' }),
      },
      wrapper: {
        borderRadius: 'inherit',
        height: '100% !important',
      },
      wrapperInner: {
        display: 'flex',
        flexDirection: 'column' as never,
        borderRadius: 'inherit',
        height: '100% !important',
        overflow: 'hidden auto',
      },
    }),
    { name: 'FullHeightCollapse' }
  );
})();
