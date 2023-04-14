import { MouseEvent } from 'react';

import type {
  SigninButtonProps,
  UserinfoMenuToggleProps,
} from '~appcraft/components';

export interface AppHeaderProps
  extends Pick<SigninButtonProps, 'oauth2'>,
    Pick<UserinfoMenuToggleProps, 'signoutURL'> {
  authorized: boolean;
  onMenuToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
