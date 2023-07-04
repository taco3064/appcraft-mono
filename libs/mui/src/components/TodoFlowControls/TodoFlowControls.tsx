import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CloseIcon from '@mui/icons-material/Close';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CropFreeIcon from '@mui/icons-material/CropFree';
import MenuIcon from '@mui/icons-material/Menu';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SyncIcon from '@mui/icons-material/Sync';
import TransformIcon from '@mui/icons-material/Transform';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useReactFlow } from 'reactflow';

import { CompositeIcon } from '../../styles';
import type { TodoFlowControlsProps } from './TodoFlowConrols.types';

export default function TodoFlowControls({ ct }: TodoFlowControlsProps) {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  return (
    <>
      <SpeedDial
        ariaLabel="Viewport Controls"
        FabProps={{ color: 'default', size: 'small' }}
        sx={{ position: 'absolute', bottom: 16, left: 8 }}
        icon={<SpeedDialIcon icon={<TuneIcon />} openIcon={<CloseIcon />} />}
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
        ariaLabel="Toolbar"
        FabProps={{ color: 'secondary', size: 'small' }}
        sx={{ position: 'absolute', bottom: 16, right: 8 }}
        icon={<SpeedDialIcon icon={<AddIcon />} openIcon={<CloseIcon />} />}
      >
        <SpeedDialAction
          tooltipTitle={ct('btn-add-iterate')}
          icon={<CompositeIcon primary={MenuIcon} secondary={SyncIcon} />}
        />

        <SpeedDialAction
          tooltipTitle={ct('btn-add-condition')}
          icon={<CallSplitIcon />}
        />

        <SpeedDialAction
          tooltipTitle={ct('btn-convert-properties')}
          icon={<TransformIcon />}
        />

        <SpeedDialAction
          tooltipTitle={ct('btn-fetch-data')}
          icon={<CompositeIcon primary={CloudQueueIcon} secondary={SyncIcon} />}
        />

        <SpeedDialAction
          tooltipTitle={ct('btn-create-variable')}
          icon={<AutoFixHighIcon />}
        />
      </SpeedDial>
    </>
  );
}
