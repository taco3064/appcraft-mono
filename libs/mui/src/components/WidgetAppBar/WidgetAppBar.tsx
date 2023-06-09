import AppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { IconTipButton } from '../../styles';
import type { WidgetAppBarProps } from './WidgetAppBar.types';

export default function WidgetAppBar({
  ct,
  description,
  type,
  onBackToStructure,
}: WidgetAppBarProps) {
  return !description ? null : (
    <AppBar color="default" position="sticky">
      <Toolbar variant="regular">
        <IconTipButton title={ct('btn-back')} onClick={onBackToStructure}>
          <ChevronLeftIcon />
        </IconTipButton>

        <Typography variant="subtitle1" fontWeight="bolder" color="primary">
          {ct(`ttl-${type}`)}

          <Divider
            flexItem
            orientation="vertical"
            sx={(theme) => ({
              borderColor: theme.palette.primary.main,
            })}
          />

          {description}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
