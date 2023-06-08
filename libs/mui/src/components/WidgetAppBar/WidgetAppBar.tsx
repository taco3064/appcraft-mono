import AppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { useFixedT } from '../../contexts';
import type { WidgetAppBarProps } from './WidgetAppBar.types';

export default function WidgetAppBar({
  fixedT,
  widget,
  widgetTypeSelection,
  onBackToStructure,
  onWidgetChange,
}: WidgetAppBarProps) {
  const ct = useFixedT(fixedT);
  const [open, setOpen] = useState(true);

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

          {widget.type && (
            <>
              <Divider
                flexItem
                orientation="vertical"
                sx={(theme) => ({
                  borderColor: theme.palette.primary.main,
                })}
              />

              {widget.type.replace(/([A-Z])/g, ' $1')}
            </>
          )}
        </Typography>

        <Toolbar disableGutters variant="dense" style={{ marginLeft: 'auto' }}>
          <Tooltip title={ct(`txt-component-setting-${open ? 'off' : 'on'}`)}>
            <IconButton color="secondary" onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon /> : <StyleOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Toolbar>

      <Collapse in={open}>
        <Divider />

        <Toolbar
          variant="regular"
          sx={(theme) => ({
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            flexWrap: 'wrap',
          })}
        >
          {widgetTypeSelection}

          <TextField
            fullWidth
            size="small"
            margin="dense"
            variant="outlined"
            label={ct('lbl-description')}
            defaultValue={widget.description}
            onChange={(e) => onWidgetChange('description', e.target.value)}
          />
        </Toolbar>
      </Collapse>
    </AppBar>
  );
}
