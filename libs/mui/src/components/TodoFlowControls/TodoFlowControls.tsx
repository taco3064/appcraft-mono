import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CloseIcon from '@mui/icons-material/Close';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CropFreeIcon from '@mui/icons-material/CropFree';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MenuIcon from '@mui/icons-material/Menu';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import StorageIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import _debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';
import { useNodes, useReactFlow } from 'reactflow';

import { CompositeIcon } from '../../styles';
import type { TodoFlowControlsProps } from './TodoFlowConrols.types';

export default function TodoFlowControls({
  ct,
  disableCategories,
  onTodoAdd,
}: TodoFlowControlsProps) {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const disables = new Set(disableCategories);
  const fitViewDebounce = useMemo(() => _debounce(fitView, 200), [fitView]);
  const nodes = useNodes();

  const [openStatus, setOpenStatus] = useState<'viewport' | 'toolbar' | null>(
    null
  );

  const handleClose: SpeedDialProps['onClose'] = (e, reason) => {
    if (reason !== 'mouseLeave') {
      setOpenStatus(null);
    }
  };

  useEffect(() => {
    fitViewDebounce({ duration: 400, nodes });
  }, [fitViewDebounce, nodes]);

  return (
    <>
      <SpeedDial
        FabProps={{ color: 'default', size: 'small' }}
        ariaLabel="Viewport Controls"
        icon={<SpeedDialIcon icon={<TuneIcon />} openIcon={<CloseIcon />} />}
        open={openStatus === 'viewport'}
        onClick={() => setOpenStatus('viewport')}
        onClose={handleClose}
        sx={{ position: 'absolute', bottom: 16, left: 8 }}
      >
        <SpeedDialAction
          tooltipTitle={ct('btn-fit-view')}
          tooltipPlacement="right"
          icon={<CropFreeIcon />}
          onClick={() => fitView({ duration: 400 })}
        />

        <SpeedDialAction
          tooltipTitle={ct('btn-zoom-out')}
          tooltipPlacement="right"
          icon={<ZoomOutIcon />}
          onClick={() => zoomOut({ duration: 400 })}
        />

        <SpeedDialAction
          tooltipTitle={ct('btn-zoom-in')}
          tooltipPlacement="right"
          icon={<ZoomInIcon />}
          onClick={() => zoomIn({ duration: 400 })}
        />
      </SpeedDial>

      <SpeedDial
        FabProps={{ color: 'secondary', size: 'small' }}
        ariaLabel="Toolbar"
        icon={<SpeedDialIcon icon={<AddIcon />} openIcon={<CloseIcon />} />}
        open={openStatus === 'toolbar'}
        onClick={() => setOpenStatus('toolbar')}
        onClose={handleClose}
        sx={{ position: 'absolute', bottom: 16, right: 8 }}
      >
        {!disables.has('state') && (
          <SpeedDialAction
            tooltipTitle={ct('btn-set-state')}
            icon={
              <CompositeIcon primary={StorageIcon} secondary={SaveAltIcon} />
            }
            onClick={() => onTodoAdd('state')}
          />
        )}

        {!disables.has('wrap') && (
          <SpeedDialAction
            tooltipTitle={ct('btn-todo-wrap')}
            icon={<Inventory2OutlinedIcon />}
            onClick={() => onTodoAdd('wrap')}
          />
        )}

        {!disables.has('iterate') && (
          <SpeedDialAction
            tooltipTitle={ct('btn-add-iterate')}
            icon={<CompositeIcon primary={MenuIcon} secondary={SyncIcon} />}
            onClick={() => onTodoAdd('iterate')}
          />
        )}

        {!disables.has('branch') && (
          <SpeedDialAction
            tooltipTitle={ct('btn-add-condition')}
            icon={<CallSplitIcon />}
            onClick={() => onTodoAdd('branch')}
          />
        )}

        {!disables.has('fetch') && (
          <SpeedDialAction
            tooltipTitle={ct('btn-fetch-data')}
            icon={
              <CompositeIcon primary={CloudQueueIcon} secondary={SyncIcon} />
            }
            onClick={() => onTodoAdd('fetch')}
          />
        )}

        {!disables.has('variable') && (
          <SpeedDialAction
            tooltipTitle={ct('btn-create-variable')}
            icon={<AutoFixHighIcon />}
            onClick={() => onTodoAdd('variable')}
          />
        )}
      </SpeedDial>
    </>
  );
}
