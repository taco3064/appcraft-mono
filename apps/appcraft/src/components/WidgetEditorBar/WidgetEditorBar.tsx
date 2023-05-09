import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { CommonButton } from '../common';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetEditorBarProps } from './WidgetEditorBar.types';

export default function WidgetEditorBar({
  accordion,
  action,
  variant,
  onElementAdd,
  onVariantChange,
}: WidgetEditorBarProps) {
  const [at, wt] = useFixedT('app', 'widgets');
  const [open, setOpen] = useState(true);

  return (
    <>
      <AppBar color="default" position="sticky">
        <Toolbar variant="regular">
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

          <Toolbar
            disableGutters
            variant="dense"
            style={{ marginLeft: 'auto' }}
          >
            {action}

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

            {accordion && (
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

        <Collapse in={accordion && open}>
          <Divider />

          <Toolbar
            variant="regular"
            sx={(theme) => ({
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(2),
              flexWrap: 'wrap',
            })}
          >
            {accordion}
          </Toolbar>
        </Collapse>
      </AppBar>

      <Divider />
    </>
  );
}
