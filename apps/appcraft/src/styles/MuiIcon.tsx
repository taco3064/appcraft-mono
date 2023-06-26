import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Badge from '@mui/material/Badge';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { withStyles } from 'tss-react/mui';

export const PlayTodoIcon = withStyles(
  (props: SvgIconProps) => (
    <Badge
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <PlayCircleIcon
          fontSize="small"
          sx={{
            backdropFilter: 'blur(16px)',
            borderRadius: '50%',
            margin: (theme) => theme.spacing(1),
            transform: 'translate(-25%, -25%)',
          }}
        />
      }
    >
      <AssignmentOutlinedIcon {...props} />
    </Badge>
  ),
  () => ({}),
  { name: 'PlayTodoIcon' }
) as typeof SvgIcon;
