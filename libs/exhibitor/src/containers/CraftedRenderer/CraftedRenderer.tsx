import LinearProgress from '@mui/material/LinearProgress';
import { LazyWidget } from '@appcraft/widgets';
import { Suspense } from 'react';
import type { ComponentProps } from 'react';

import * as Hook from '../../hooks';
import { RendererContent } from '../../components';
import type * as Types from './CraftedRenderer.types';

export default function CraftedRenderer({
  GridLayoutProps,
  elevation,
  options,
  onFetchData,
  onFetchWrapper,
  onOutputCollect,
}: Types.CraftedRendererProps) {
  const LazyRenderer = Hook.useLazyRenderer<Types.LazyRendererProps>(
    options as Parameters<typeof Hook.useLazyRenderer>[0],
    onFetchWrapper,
    ({ fetchData, ...props }) => (
      <RendererContent
        {...(props as ComponentProps<typeof RendererContent>)}
        templates={fetchData as Exclude<typeof fetchData, undefined>}
      />
    )
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      {options && (
        <LazyRenderer
          {...{ GridLayoutProps, elevation, onFetchData, onOutputCollect }}
          options={options}
          onFetchTodoWrapper={onFetchWrapper}
          onLazyRetrieve={(type) => LazyWidget[type]}
        />
      )}
    </Suspense>
  );
}
