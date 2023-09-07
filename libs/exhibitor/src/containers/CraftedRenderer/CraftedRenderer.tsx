import LinearProgress from '@mui/material/LinearProgress';
import { Suspense } from 'react';

import * as Hook from '../../hooks';
import { ExhibitionContent } from '../../components';
import { GlobalStateProvider, HandlesProvider } from '../../contexts';
import type * as Types from './CraftedRenderer.types';
import type { ExhibitionContentProps } from '../../components';

export default function CraftedRenderer({
  GridLayoutProps,
  action,
  breakpoint,
  elevation,
  options,
  onFetchData,
  onFetchWrapper,
  onOutputCollect,
  onReady,
}: Types.CraftedRendererProps) {
  const LazyContent = Hook.useLazyWidgetNav<ExhibitionContentProps>(
    options,
    onFetchWrapper,
    ({ fetchData, ...props }) => (
      <HandlesProvider
        {...{ onFetchData, onFetchWrapper, onOutputCollect, onReady }}
        getWidgetOptions={fetchData as Exclude<typeof fetchData, undefined>}
      >
        <GlobalStateProvider>
          <ExhibitionContent {...props} />
        </GlobalStateProvider>
      </HandlesProvider>
    )
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      {options && (
        <LazyContent
          {...({
            GridLayoutProps,
            action,
            breakpoint,
            elevation,
            options,
          } as ExhibitionContentProps)}
        />
      )}
    </Suspense>
  );
}
