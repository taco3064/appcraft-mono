import { Suspense } from 'react';

import { useWidgetGenerator } from '../../hooks';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer({
  fetchTodoWrap,
  lazy,
  options,
}: CraftedRendererProps) {
  const generator = useWidgetGenerator(
    lazy,
    fetchTodoWrap,
    (Widget, props, i) => <Widget key={`widget_${i}`} {...props} />
  );

  return !options ? null : (
    <Suspense>
      {!Array.isArray(options)
        ? generator(options, 0)
        : options.map((layout) => <>Layout</>)}
    </Suspense>
  );
}
