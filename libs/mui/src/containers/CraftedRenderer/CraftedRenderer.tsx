import { Suspense } from 'react';

import { useWidgetGenerator } from '../../hooks';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer({
  lazy,
  options = [],
  onFetchTodoWrapper,
  onOutputCollect,
}: CraftedRendererProps) {
  const generator = useWidgetGenerator(
    options,
    { externalLazy: lazy, onFetchTodoWrapper, onOutputCollect },
    (Widget, { key, props }) => <Widget key={key} {...props} />
  );

  return !options ? null : (
    <Suspense>
      {!Array.isArray(options)
        ? generator(options)
        : options.map((layout) => <>Layout</>)}
    </Suspense>
  );
}
