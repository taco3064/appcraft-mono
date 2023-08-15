import type { OutputCollectEvent } from '@appcraft/craftsman';
import type { ReactNode } from 'react';

export interface TodoOutputStepperProps extends OutputCollectEvent {
  fullHeight?: boolean;
  title?: ReactNode;
}
