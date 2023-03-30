import Avatar from '@mui/material/Avatar';

export type LazyAvatarHook = (idToken: string) => typeof Avatar;

export interface UserinfoMenuToggleProps {
  menuTransform?: string;
}
