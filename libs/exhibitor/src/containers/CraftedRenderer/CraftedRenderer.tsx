import LinearProgress from '@mui/material/LinearProgress';
import { LazyWidget } from '@appcraft/widgets';
import { Suspense } from 'react';
import type { ComponentProps } from 'react';

import * as Hook from '../../hooks';
import { ExhibitionContent } from '../../components';
import type * as Types from './CraftedRenderer.types';

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
  const LazyContent =
    Hook.useLazyWidgetInitial<Types.LazyExhibitionContentProps>(
      options as Parameters<typeof Hook.useLazyWidgetInitial>[0],
      onFetchWrapper,
      ({ fetchData, ...props }) => (
        <ExhibitionContent
          {...(props as ComponentProps<typeof ExhibitionContent>)}
          templates={fetchData as Exclude<typeof fetchData, undefined>}
        />
      )
    );

  return (
    <Suspense fallback={<LinearProgress />}>
      {options && (
        <LazyContent
          {...{
            GridLayoutProps,
            action,
            breakpoint,
            elevation,
            options,
            onFetchData,
            onOutputCollect,
            onReady,
          }}
          onFetchTodoWrapper={onFetchWrapper}
          onLazyRetrieve={(type) => LazyWidget[type]}
        />
      )}
    </Suspense>
  );
}
