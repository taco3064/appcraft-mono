import Container from '@mui/material/Container';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import type { GridLayoutProps } from './GridLayout.types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridLayout({
  breakpoint,
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
    <Container
      disableGutters
      maxWidth={breakpoint || false}
      style={{
        position: 'relative',
        height: 'auto',
        ...(breakpoint && {
          minWidth: theme.breakpoints.values[breakpoint],
        }),
      }}
    >
      <ResponsiveGridLayout
        {...props}
        rowHeight={Number.parseInt(theme.spacing(6).replace(/px$/, ''), 10)}
        style={{ minHeight: theme.spacing(6) }}
      >
        {children}
      </ResponsiveGridLayout>
    </Container>
  );
}
