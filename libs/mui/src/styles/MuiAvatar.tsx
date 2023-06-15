import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { withStyles } from 'tss-react/mui';

type TinyAvatarProps = AvatarProps & {
  color: 'primary' | 'secondary';
};

export const TinyAvatar = withStyles(
  ({ color: _color, ...props }: TinyAvatarProps) => <Avatar {...props} />,
  (theme, { color = 'primary' }) => ({
    root: {
      background: theme.palette[color].main,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: 'bolder',
      borderRadius: theme.spacing(0.5),
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
  {
    name: 'SmallAvatar',
  }
);
