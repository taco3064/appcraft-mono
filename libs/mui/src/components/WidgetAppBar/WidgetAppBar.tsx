import AppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { IconTipButton } from '../../styles';
import { useFixedT } from '../../hooks';
import type { WidgetAppBarProps } from './WidgetAppBar.types';

export default function WidgetAppBar({
  description,
  onBackToStructure,
}: WidgetAppBarProps) {
  const ct = useFixedT();

  return (
    <AppBar color="default" position="sticky">
      <Toolbar variant="regular">
        <IconTipButton title={ct('btn-back')} onClick={onBackToStructure}>
          <ChevronLeftIcon />
        </IconTipButton>

        <Typography variant="subtitle1" fontWeight="bolder" color="primary">
          {ct('ttl-props')}

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
