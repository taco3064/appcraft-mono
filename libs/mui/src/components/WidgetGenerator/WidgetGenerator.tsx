import { Suspense } from 'react';

import * as Hooks from '../../hooks';
import type { WidgetGeneratorProps } from './WidgetGenerator.types';

export default function WidgetGenerator({ options }: WidgetGeneratorProps) {
  const LazyWidget = Hooks.useLazyWidget(options);

  const widgetProps = Hooks.useWidgetProps<typeof LazyWidget>(
    options,
    (child, i) => (
      <WidgetGenerator
        key={`${child.category === 'node' ? child.type : child.category}_${i}`}
        options={child}
      />
    )
  );

  return (
    <Suspense>
      <LazyWidget {...widgetProps} />
    </Suspense>
  );
}
