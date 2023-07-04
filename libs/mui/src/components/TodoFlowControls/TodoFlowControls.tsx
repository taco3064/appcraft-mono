import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CropFreeIcon from '@mui/icons-material/CropFree';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SyncIcon from '@mui/icons-material/Sync';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useReactFlow } from 'reactflow';

export default function TodoFlowControls() {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  return (
    <>
      <SpeedDial
        ariaLabel="Viewport Controls"
        FabProps={{ color: 'default', size: 'small' }}
        icon={<TuneIcon />}
        sx={{ position: 'absolute', bottom: 16, left: 8 }}
      >
        <SpeedDialAction
          icon={<CropFreeIcon />}
          onClick={() => fitView({ duration: 400 })}
        />

        <SpeedDialAction
          icon={<ZoomOutIcon />}
          onClick={() => zoomOut({ duration: 400 })}
        />

        <SpeedDialAction
          icon={<ZoomInIcon />}
          onClick={() => zoomIn({ duration: 400 })}
        />
      </SpeedDial>

      <SpeedDial
        ariaLabel="Toolbar"
        FabProps={{ color: 'secondary', size: 'small' }}
        icon={<AddIcon />}
        sx={{ position: 'absolute', bottom: 16, right: 8 }}
      >
        <SpeedDialAction aria-label="add variable" icon={<AutoFixHighIcon />} />
        <SpeedDialAction aria-label="fetch data" icon={<SyncIcon />} />
      </SpeedDial>
    </>
  );
}
