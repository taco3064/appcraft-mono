import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import type { MouseEventHandler } from 'react';

import * as Style from '../../../styles';
import type { GridActionProps } from './GridAction.types';

export default function GridAction({ action, layout }: GridActionProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleActionClose: MouseEventHandler = ({ target, currentTarget }) => {
    const el = target as HTMLElement;

    if (el.closest('button')?.closest('header') === currentTarget) {
      setAnchorEl(undefined);
    }
  };

  return !action ? null : (
    <>
      <Style.GridLayoutItemAction
        size="small"
        color="info"
        variant="extended"
        disabled={Boolean(anchorEl)}
      >
        <DragIndicatorIcon className="drag-handle" style={{ cursor: 'move' }} />

        <Divider flexItem orientation="vertical" />

        <TuneIcon
          onClick={(e) =>
            setAnchorEl(e.currentTarget.closest('button') as HTMLButtonElement)
          }
        />
      </Style.GridLayoutItemAction>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(undefined)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: (theme) => ({
            borderRadius: `${theme.spacing(2.5)} / 50%`,
            marginTop: theme.spacing(1),
          }),
        }}
      >
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            {action(layout, (fn) => async () => {
              await fn?.();
              setAnchorEl(undefined);
            })}
          </Toolbar>
        </AppBar>
      </Popover>
    </>
  );
}
