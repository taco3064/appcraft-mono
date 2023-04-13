import { MouseEvent } from 'react';
import type { SigninButtonProps } from '~appcraft/components';

export interface AppHeaderProps extends Pick<SigninButtonProps, 'oauth2'> {
  authorized: boolean;
  onMenuToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
