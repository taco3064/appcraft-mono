import LinearProgress from '@mui/material/LinearProgress';
import { Suspense } from 'react';

import * as Hook from '../../hooks';
import { GlobalStateProvider, HandlesProvider } from '../../contexts';
import { Showcase } from '../../components';
import type * as Types from './CraftedRenderer.types';
import type { ShowcaseProps } from '../../components';

export default function CraftedRenderer({
  CollectionGridProps,
  elevation,
  options,
  onFetchData,
  onFetchWrapper,
  onOutputCollect,
  onReady,
}: Types.CraftedRendererProps) {
  const LazyShowcase = Hook.useLazyWidgetNav<ShowcaseProps>(
    options,
    onFetchWrapper,
    ({ fetchData, ...props }) => (
      <HandlesProvider
        {...{ onFetchData, onFetchWrapper, onOutputCollect }}
        getWidgetOptions={fetchData as Exclude<typeof fetchData, undefined>}
      >
        <GlobalStateProvider onReady={onReady}>
          <Showcase {...props} />
        </GlobalStateProvider>
      </HandlesProvider>
    )
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      {options && (
        <LazyShowcase
          {...({
            CollectionGridProps,
            elevation,
            options,
          } as ShowcaseProps)}
        />
      )}
    </Suspense>
  );
}
