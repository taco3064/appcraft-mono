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
  const LazyRenderer = Hook.useLazyRenderer(options, onFetchWidget);

  const generator = Hook.useWidgetGenerator(options, {
    lazy,
    onFetchTodoWrapper,
    onOutputCollect,
    renderer: (Widget, { key, props }) => <Widget key={key} {...props} />,
  });

  return !options ? null : (
    <Suspense>
      <LazyRenderer>
        {(templates) =>
          !Array.isArray(options) ? (
            generator(options, { templates })
          ) : (
            <>
              {options.map((layout) => (
                <>Layout</>
              ))}
            </>
          )
        }
      </LazyRenderer>
    </Suspense>
  );
}
