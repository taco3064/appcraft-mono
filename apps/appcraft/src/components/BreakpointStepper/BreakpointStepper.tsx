import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import MobileStepper from '@mui/material/MobileStepper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { CommonButton } from '~appcraft/components/common';
import { useFixedT } from '~appcraft/hooks';
import type { BreakpointStepperProps } from './BreakpointStepper.types';

export default function BreakpointStepper({
  disableNextButton = false,
  value,
  onChange,
}: BreakpointStepperProps) {
  const [pt] = useFixedT('pages');
  const theme = useTheme();
  const breakpoints = theme.breakpoints.keys;
  const activeStep = breakpoints.indexOf(value);

  return (
    <Toolbar variant="dense">
      <MobileStepper
        position="static"
        variant="dots"
        steps={breakpoints.length}
        activeStep={activeStep}
        style={{ width: '100%', background: 'transparent' }}
        backButton={
          <CommonButton
            btnVariant="icon"
            disabled={activeStep === 0}
            icon={<ChevronLeftIcon />}
            onClick={() => onChange(breakpoints[activeStep - 1])}
            text={`${pt(`lbl-${breakpoints[activeStep - 1]}`)} (${
              theme.breakpoints.values[breakpoints[activeStep - 1]]
            }px)`}
          />
        }
        nextButton={
          <CommonButton
            btnVariant="icon"
            disabled={
              disableNextButton || activeStep === breakpoints.length - 1
            }
            icon={<ChevronRightIcon />}
            onClick={() => onChange(breakpoints[activeStep + 1])}
            text={`${pt(`lbl-${breakpoints[activeStep + 1]}`)} (${
              theme.breakpoints.values[breakpoints[activeStep + 1]]
            }px)`}
          />
        }
      />

      <Divider orientation="vertical" flexItem />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minWidth={theme.spacing(15)}
      >
        <Typography variant="subtitle1" color="secondary" whiteSpace="nowrap">
          {pt(`lbl-${breakpoints[activeStep]}`)}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {theme.breakpoints.values[breakpoints[activeStep]]}px
        </Typography>
      </Box>
    </Toolbar>
  );
}
