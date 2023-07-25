import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export const IconTipButton = (() => {
  type IconTipButtonProps = IconButtonProps & Pick<TooltipProps, 'title'>;

  return ({ title, ...props }: IconTipButtonProps) => (
    <Tooltip title={title}>
      <IconButton {...props} />
    </Tooltip>
  );
})();
