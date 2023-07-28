import type { OutputCollectEvent } from '@appcraft/mui';
import type { ReactNode } from 'react';

export interface TodoOutputStepperProps extends OutputCollectEvent {
  fullHeight?: boolean;
  title?: ReactNode;
}
