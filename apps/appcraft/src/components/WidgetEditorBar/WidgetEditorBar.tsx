import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { CommonButton } from '../common';
import { WidgetSelect } from '../WidgetSelect';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetEditorBarProps } from './WidgetEditorBar.types';

export default function WidgetEditorBar({
  action,
  widget,
  onBackToElements,
  onElementAdd,
  onValueChange,
}: WidgetEditorBarProps) {
  const [at, wt] = useFixedT('app', 'widgets');
  const [open, setOpen] = useState(true);

  return (
    <>
      <AppBar color="default" position="sticky">
        <Toolbar variant="regular">
          {widget && (
            <CommonButton
              btnVariant="icon"
              icon={ChevronLeftIcon}
              text={at('btn-back')}
              onClick={onBackToElements}
            />
          )}

          <Typography variant="subtitle1" fontWeight="bolder" color="primary">
            {wt(`ttl-${widget ? 'props' : 'elements'}`)}

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
            {action}

            {!widget ? (
              <CommonButton
                btnVariant="icon"
                color="secondary"
                icon={AddIcon}
                text={wt('btn-add-element')}
                onClick={() =>
                  onElementAdd(
                    `Widget_${Math.random().toFixed(5).replace('.', '')}`
                  )
                }
              />
            ) : (
              <CommonButton
                btnVariant="icon"
                color="secondary"
                icon={open ? ExpandLessIcon : StyleOutlinedIcon}
                text={wt(`txt-component-setting-${open ? 'off' : 'on'}`)}
                onClick={() => setOpen(!open)}
              />
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
              <WidgetSelect
                fullWidth
                size="small"
                margin="dense"
                variant="outlined"
                label={wt('lbl-widget-type')}
                defaultValue={widget.type}
                onChange={(e) => onValueChange('type', e.target.value)}
              />

              <TextField
                fullWidth
                size="small"
                margin="dense"
                variant="outlined"
                label={wt('lbl-description')}
                defaultValue={widget.description}
                onChange={(e) => onValueChange('description', e.target.value)}
              />
            </Toolbar>
          </Collapse>
        )}
      </AppBar>

      <Divider />
    </>
  );
}
