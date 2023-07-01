import type { MouseEvent } from 'react';

export interface SigninButtonProps {
  oauth2: {
    google: string;
  };

  onSigninClick?: (
    oauth2Type: keyof SigninButtonProps['oauth2'],
    e: MouseEvent<HTMLAnchorElement>
  ) => void;
}
