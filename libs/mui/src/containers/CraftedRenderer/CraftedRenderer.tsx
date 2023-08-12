import LinearProgress from '@mui/material/LinearProgress';
import { LazyWidget } from '@appcraft/widgets';
import { Suspense } from 'react';

import * as Hook from '../../hooks';
import type * as Types from './CraftedRenderer.types';

function RendererContent({
  fetchData,
  options,
  ...props
}: Types.RendererContentProps) {
  const [isPrepared, handleState] = Hook.useRendererState(options, fetchData);

  const render = Hook.useRender(
    props,
    handleState,
    (Widget, { key, props }) => <Widget key={key} {...props} />
  );

  return !isPrepared ? null : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!Array.isArray(options)
        ? render(options, { state: { id: options.id } })
        : options.map(({ widget }) =>
            render(widget, { state: { id: widget.id } })
          )}
    </>
  );
}

export default function CraftedRenderer({
  options,
  onFetchData,
  onFetchWrapper,
  onOutputCollect,
}: Types.CraftedRendererProps) {
  const LazyRenderer = Hook.useLazyRenderer<Types.LazyRendererProps>(
    options as Parameters<typeof Hook.useLazyRenderer>[0],
    onFetchWrapper,
    (props) => <RendererContent {...(props as Types.RendererContentProps)} />
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      {options && (
        <LazyRenderer
          {...{ onFetchData, onOutputCollect }}
          options={options}
          onFetchTodoWrapper={onFetchWrapper}
          onLazyRetrieve={(type) => LazyWidget[type]}
        />
      )}
    </Suspense>
  );
}
