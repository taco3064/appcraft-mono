import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { CommonButton } from '../common';
import { GapToolbar } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetEditorBarProps } from './WidgetEditorBar.types';

export default function WidgetEditorBar({
  accordion,
  variant,
  onElementAdd,
  onVariantChange,
}: WidgetEditorBarProps) {
  const [at, wt] = useFixedT('app', 'widgets');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);
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
                icon={FilterAltOutlinedIcon}
                text={wt('btn-props-filter')}
                onClick={(e) => setAnchorEl(e.currentTarget)}
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
          </GapToolbar>
        </GapToolbar>

        <Collapse in={accordion && open}>
          <Divider />

          <GapToolbar
            variant="regular"
            sx={(theme) => ({
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(2),
              flexWrap: 'wrap',
            })}
          >
            {accordion}
          </GapToolbar>
        </Collapse>
      </AppBar>

      <Divider />
    </>
  );
}
