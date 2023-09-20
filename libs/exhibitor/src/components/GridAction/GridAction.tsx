import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';

import * as Style from '../../styles';
import type { GridActionProps } from './GridAction.types';

export default function GridAction({ action, layout }: GridActionProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={(theme) => ({
          display: anchorEl ? 'block' : 'none',
          transition: theme.transitions.create(['display'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        })}
        PaperProps={{
          sx: (theme) => ({
            borderRadius: `${theme.spacing(2.5)} / 50%`,
            marginBottom: theme.spacing(1),
          }),
        }}
      >
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            {action(layout, (fn) => (...e) => {
              const result = fn?.(...e);

              if (result instanceof Promise) {
                result.finally(() => setAnchorEl(undefined));
              } else {
                setAnchorEl(undefined);
              }
            })}
          </Toolbar>
        </AppBar>
      </Popover>
    </>
  );
}
