import { MouseEvent } from 'react';
import type { SigninProps } from '../Signin';

export interface AppHeaderProps extends Pick<SigninProps, 'oauth2'> {
  onMenuToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
