import { MouseEvent } from 'react';
import type { SigninButtonProps } from '../SigninButton';

export interface AppHeaderProps extends Pick<SigninButtonProps, 'oauth2'> {
  authorized: boolean;
  onMenuToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
