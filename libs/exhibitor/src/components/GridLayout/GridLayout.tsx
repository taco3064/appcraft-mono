import { Responsive, WidthProvider } from 'react-grid-layout';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import { GridLayoutContainer } from '../../styles';
import type { GridLayoutProps } from './GridLayout.types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridLayout({
  breakpoint,
  breakpoints,
  children,
  options,
  ...props
}: GridLayoutProps) {
  const theme = useTheme();

  useEffect(() => {
    if (breakpoint) {
      window.dispatchEvent(new Event('resize'));
    }
  }, [breakpoint]);

  return (
    <GridLayoutContainer
      disableGutters
      breakpoint={breakpoint}
      maxWidth={breakpoint || false}
    >
      <ResponsiveGridLayout
        {...props}
        rowHeight={Number.parseInt(theme.spacing(6).replace(/px$/, ''), 10)}
        style={{ minHeight: theme.spacing(6) }}
        breakpoints={Object.fromEntries(
          Object.entries(breakpoints || {}).map(([key, value]) => [
            key,
            value - 1,
          ])
        )}
      >
        {children}
      </ResponsiveGridLayout>
    </GridLayoutContainer>
  );
}
