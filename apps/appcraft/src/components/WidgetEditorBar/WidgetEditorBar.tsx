import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import * as MuiProxy from '~appcraft/proxy';
import { CommonButton } from '../common';
import { GapToolbar } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetEditorBarProps } from './WidgetEditorBar.types';

export default function WidgetEditorBar({
  variant,
  onElementAdd,
  onVariantChange,
}: WidgetEditorBarProps) {
  const [at, wt] = useFixedT('app', 'widgets');
  const [open, setOpen] = useState(true);

  return (
    <>
      <AppBar color="default" position="sticky">
        <GapToolbar variant="regular">
          {variant === 'props' && (
            <CommonButton
              btnVariant="icon"
              icon={ChevronLeftIcon}
              text={at('btn-back')}
              onClick={() => onVariantChange('elements')}
            />
          )}

          <Typography variant="subtitle1" fontWeight="bolder" color="primary">
            {wt(`ttl-${variant}`)}
          </Typography>

          <GapToolbar
            disableGutters
            variant="dense"
            style={{ marginLeft: 'auto' }}
          >
            {variant === 'elements' && (
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
            )}

            {variant === 'props' && (
              <CommonButton
                btnVariant="icon"
                color="secondary"
                icon={open ? ExpandLessIcon : StyleOutlinedIcon}
                text={wt(`txt-component-setting-${open ? 'off' : 'on'}`)}
                onClick={() => setOpen(!open)}
              />
            )}
          </GapToolbar>
        </GapToolbar>

        <Collapse in={variant === 'props' && open}>
          <Divider />

          <GapToolbar
            variant="regular"
            sx={(theme) => ({
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(2),
              flexWrap: 'wrap',
            })}
          >
            <TextField
              SelectProps={{ displayEmpty: true }}
              fullWidth
              select
              size="small"
              margin="dense"
              variant="outlined"
              label={wt('lbl-widget-type')}
            >
              {Object.entries(MuiProxy).reduce(
                (result, [category, components]) => {
                  result.push(
                    <MenuItem key={category} disabled>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: 'caption',
                          color: 'primary',
                        }}
                        primary={category}
                      />
                    </MenuItem>,

                    ...Object.keys(components).map((name) => (
                      <MenuItem
                        key={name}
                        value={`${category}.${name}`}
                        sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            variant: 'subtitle1',
                            color: 'text.primary',
                            style: { margin: 0 },
                          }}
                          primary={name}
                        />
                      </MenuItem>
                    ))
                  );

                  return result;
                },
                []
              )}
            </TextField>

            <TextField
              fullWidth
              size="small"
              margin="dense"
              variant="outlined"
              label="Description"
            />
          </GapToolbar>
        </Collapse>
      </AppBar>

      <Divider />
    </>
  );
}
