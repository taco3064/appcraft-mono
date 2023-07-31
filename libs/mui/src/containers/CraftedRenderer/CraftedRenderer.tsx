import { Suspense } from 'react';

import * as Hook from '../../hooks';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer({
  lazy,
  options = [],
  onFetchTodoWrapper,
  onFetchWidget,
  onOutputCollect,
}: CraftedRendererProps) {
  const { LazyRenderer, templates } = Hook.useLazyRenderer(
    options,
    onFetchWidget
  );

  const generator = Hook.useWidgetGenerator(options, templates, {
    lazy,
    onFetchTodoWrapper,
    onOutputCollect,
    renderer: (Widget, { key, props }) => <Widget key={key} {...props} />,
  });

  return !options ? null : (
    <Suspense>
      <LazyRenderer>
        {!Array.isArray(options) ? (
          generator(options)
        ) : (
          <>
            {options.map((layout) => (
              <>Layout</>
            ))}
          </>
        )}
      </LazyRenderer>
    </Suspense>
  );
}
