import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
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
import type { EditorAppBarProps } from './EditorAppBar.types';

export default function EditorAppBar({
  fixedT,
  select,
  widget,
  onBackToElements,
  onChange,
  onElementAdd,
}: EditorAppBarProps) {
  const ct = useFixedT(fixedT);
  const [open, setOpen] = useState(true);

  return (
    <>
      <AppBar color="default" position="sticky">
        <Toolbar variant="regular">
          {widget && (
            <Tooltip title={ct('btn-back')}>
              <IconButton onClick={onBackToElements}>
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          )}

          <Typography variant="subtitle1" fontWeight="bolder" color="primary">
            {ct(`ttl-${widget ? 'props' : 'elements'}`)}

            {widget?.type && (
              <>
                <Divider
                  flexItem
                  orientation="vertical"
                  sx={(theme) => ({
                    borderColor: theme.palette.primary.main,
                  })}
                />
                {widget.type?.replace(/([A-Z])/g, ' $1')}
              </>
            )}
          </Typography>

          <Toolbar
            disableGutters
            variant="dense"
            style={{ marginLeft: 'auto' }}
          >
            {!widget ? (
              <Tooltip title={ct('btn-add-element')}>
                <IconButton
                  color="secondary"
                  onClick={() =>
                    onElementAdd(
                      `Widget_${Math.random().toFixed(5).replace('.', '')}`
                    )
                  }
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title={ct(`txt-component-setting-${open ? 'off' : 'on'}`)}
              >
                <IconButton color="secondary" onClick={() => setOpen(!open)}>
                  {open ? <ExpandLessIcon /> : <StyleOutlinedIcon />}
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </Toolbar>

        {widget && (
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
              {select}

              <TextField
                fullWidth
                size="small"
                margin="dense"
                variant="outlined"
                label={ct('lbl-description')}
                defaultValue={widget.description}
                onChange={(e) => onChange('description', e.target.value)}
              />
            </Toolbar>
          </Collapse>
        )}
      </AppBar>

      <Divider />
    </>
  );
}
