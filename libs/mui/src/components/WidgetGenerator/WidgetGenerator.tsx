import { Suspense } from 'react';

import { useLazyWidget } from '../../contexts';
import { useWidgetProps } from '../../hooks';
import type { WidgetGeneratorProps } from './WidgetGenerator.types';

export default function WidgetGenerator({ options }: WidgetGeneratorProps) {
  const LazyWidget = useLazyWidget(options);
  const widgetProps = useWidgetProps<typeof LazyWidget>(options);

  console.log(LazyWidget, widgetProps);

  return (
    <Suspense>
      <LazyWidget />
    </Suspense>
  );
}
