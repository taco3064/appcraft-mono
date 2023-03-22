import { MouseEvent } from 'react';
import type { SigninDialogProps } from '../SigninDialog';

export interface AppHeaderProps extends Pick<SigninDialogProps, 'oauth2'> {
  onMenuToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
