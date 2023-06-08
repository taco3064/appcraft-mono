import * as Mui from '@mui/material';
import { ComponentType, useMemo } from 'react';

import type { WidgetGeneratorProps } from './WidgetGenerator.types';

export default function WidgetGenerator({ options }: WidgetGeneratorProps) {
  // const WidgetElement = useMemo(
  //   () => (Mui[options.type as keyof typeof Mui] as ComponentType) || null,
  //   [options.type]
  // );

  return <>TEST</>;
}
