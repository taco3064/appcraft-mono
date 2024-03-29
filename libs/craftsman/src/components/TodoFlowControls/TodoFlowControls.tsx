import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CropFreeIcon from '@mui/icons-material/CropFree';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import _debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';
import { useNodes, useReactFlow } from 'reactflow';
import type * as Appcraft from '@appcraft/types';

import { ActionButton } from './TodoFlowConrols.types';
import { TodoIcon } from '../../styles';
import { useLocalesContext } from '../../contexts';
import type { TodoFlowControlsProps } from './TodoFlowConrols.types';

export default function TodoFlowControls({
  disableCategories,
  onTodoAdd,
}: TodoFlowControlsProps) {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const ct = useLocalesContext();
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
    const handleResize = () => fitViewDebounce({ duration: 400, nodes });

    handleResize();
    global.window?.addEventListener('resize', handleResize);

    return () => global.window?.removeEventListener('resize', handleResize);
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
        {Object.entries(ActionButton).map(([key, btnText]) => {
          const category = key as Appcraft.WidgetTodo['category'];

          return disables.has(category) ? null : (
            <SpeedDialAction
              key={category}
              tooltipTitle={ct(btnText)}
              icon={<TodoIcon variant={category} />}
              onClick={() => onTodoAdd(category)}
            />
          );
        })}
      </SpeedDial>
    </>
  );
}
