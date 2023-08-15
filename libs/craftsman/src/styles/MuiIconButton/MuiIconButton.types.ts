import type { IconButtonProps } from '@mui/material/IconButton';
import type { TooltipProps } from '@mui/material/Tooltip';

export type IconTipButtonProps = IconButtonProps & Pick<TooltipProps, 'title'>;
