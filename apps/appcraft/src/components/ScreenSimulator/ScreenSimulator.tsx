import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useRef, useState } from 'react';
import type { Breakpoint } from '@mui/material/styles';

import BreakpointStepper from '../BreakpointStepper';
import type * as Types from './ScreenSimulator.types';

//* Variables
const SCREEN_SIZE: Types.BreakpointConfig = {
  xs: 190,
  sm: 140,
  md: 68,
  lg: 56,
  xl: 52,
};

const CONTAINER_WIDTH: Types.BreakpointConfig = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

//* Components
export default function ScreenSimulator({
  children,
  title,
}: Types.ScreenSimulatorProps) {
  const paperRef = useRef<HTMLDivElement>();
  const scaleRef = useRef<HTMLDivElement>();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    if (paperRef.current) {
      const rescaleFn = () => {
        const { [breakpoint]: w } = CONTAINER_WIDTH;
        const { width } = paperRef.current.getBoundingClientRect();
        const scale = width / w;

        scaleRef.current.style.transform = `scale(${scale})`;
        scaleRef.current.style.width = `${1 / scale}%`;
        scaleRef.current.style.height = `${1 / scale}%`;
      };

      rescaleFn();
      global.window?.addEventListener('resize', rescaleFn);

      return () => {
        global.window?.removeEventListener('resize', rescaleFn);
      };
    }
  }, [breakpoint]);

  return (
    <>
      {title && (
        <Toolbar
          disableGutters
          variant="dense"
          style={{}}
          sx={(theme) => ({
            userSelect: 'none',
            [theme.breakpoints.only('xs')]: {
              display: 'flex',
              flexDirection: 'column',
            },
          })}
        >
          {title}
          <BreakpointStepper value={breakpoint} onChange={setBreakpoint} />
        </Toolbar>
      )}

      <Container
        maxWidth={breakpoint}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          boxShadow: theme.shadows[10],
          borderRadius: theme.spacing(1.5),
          marginY: theme.spacing(2),
          padding: `${theme.spacing(1.5, 1.5, 6, 1.5)} !important`,
          background: `linear-gradient(135deg, #252525, #000)`,
        })}
      >
        <Paper
          ref={paperRef}
          sx={(theme) => ({
            position: 'relative',
            display: 'grid',
            borderRadius: theme.spacing(1, 1, 0.5, 0.5),
            width: '100%',
            height: '100%',
            paddingTop: `${SCREEN_SIZE[breakpoint]}%`,
          })}
        >
          <Container
            disableGutters
            maxWidth={false}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <div ref={scaleRef}>{children}</div>
          </Container>
        </Paper>
      </Container>
    </>
  );
}
