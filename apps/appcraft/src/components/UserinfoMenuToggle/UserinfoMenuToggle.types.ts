import Avatar from '@mui/material/Avatar';

export type LazyAvatarHook = (token: string) => typeof Avatar;

export interface UserinfoMenuToggleProps {
  menuTransform?: string;
}
