import AppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useFixedT } from '../../contexts';
import type { WidgetAppBarProps } from './WidgetAppBar.types';

export default function WidgetAppBar({
  description,
  onBackToStructure,
}: WidgetAppBarProps) {
  const ct = useFixedT();

  return (
    <AppBar color="default" position="sticky">
      <Toolbar variant="regular">
        <Tooltip title={ct('btn-back')}>
          <IconButton onClick={onBackToStructure}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>

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

        {/* <Toolbar disableGutters variant="dense" style={{ marginLeft: 'auto' }}>
          <Tooltip title={ct(`txt-component-setting-${open ? 'off' : 'on'}`)}>
            <IconButton color="secondary" onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon /> : <StyleOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar> */}
      </Toolbar>
    </AppBar>
  );
}
