import type { OutputCollectEvent } from '@appcraft/exhibitor';
import type { ReactNode } from 'react';

export interface TodoOutputStepperProps extends OutputCollectEvent {
  fullHeight?: boolean;
  title?: ReactNode;
}
