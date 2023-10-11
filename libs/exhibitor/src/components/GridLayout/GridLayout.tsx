import { Responsive, WidthProvider } from 'react-grid-layout';
import { useEffect, useMemo, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const resizeObserver = useMemo(
    () =>
      new ResizeObserver(() => {
        if (breakpoint) {
          window.dispatchEvent(new Event('resize'));
        }
      }),
    [breakpoint]
  );

  useEffect(() => {
    const { current: el } = containerRef;

    if (el) {
      resizeObserver.observe(el);

      return () => resizeObserver.unobserve(el);
    }
  }, [resizeObserver]);

  return (
    <GridLayoutContainer
      ref={containerRef}
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
