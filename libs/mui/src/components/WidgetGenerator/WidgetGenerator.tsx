import { Suspense } from 'react';

import * as Hooks from '../../hooks';
import type { WidgetGeneratorProps } from './WidgetGenerator.types';

export default function WidgetGenerator({ options }: WidgetGeneratorProps) {
  const LazyWidget = Hooks.useLazyWidget(options);

  const widgetProps = Hooks.useWidgetProps<typeof LazyWidget>(
    options,
    (child) => <WidgetGenerator options={child} />
  );

  return (
    <Suspense>
      <LazyWidget {...widgetProps} />
    </Suspense>
  );
}
