import AppBar from '@mui/material/AppBar';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { JSONTree } from 'react-json-tree';
import { useState } from 'react';

import * as Hook from '~appcraft/hooks';
import type { TodoStepperProps } from './TodoStepper.types';

export default function TodoStepper({
  title,
  duration,
  logs,
  todos,
}: TodoStepperProps) {
  const [tt] = Hook.useFixedT('todos');
  const [active, setActive] = useState<number[]>(
    new Array(logs.length).fill(0)
  );

  return (
    <>
      {title && (
        <AppBar color="default" position="static">
          <Toolbar variant="regular">{title}</Toolbar>
        </AppBar>
      )}

      <Container style={{ height: '100%', overflow: 'hidden auto' }}>
        {logs.length === 0 && (
          <Typography
            variant="h6"
            color="text.secondary"
            justifyContent="center"
            marginY={4}
          >
            {tt('msg-no-logs')}
          </Typography>
        )}

        {logs.map((outputs, i) => (
          <Stepper
            key={`log-${i}`}
            nonLinear
            orientation="vertical"
            activeStep={active[i]}
          >
            {outputs.map(({ id, output }, ii) => (
              <Step key={id}>
                <StepButton
                  optional={<Typography variant="caption">{id}</Typography>}
                  onClick={() =>
                    setActive((prev) => {
                      prev[i] = ii;

                      return [...prev];
                    })
                  }
                >
                  {todos[id].description}
                </StepButton>

                <StepContent>
                  <Collapse in={active[i] === ii}>
                    <JSONTree data={output} />
                  </Collapse>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        ))}
      </Container>

      <AppBar color="transparent" position="static">
        <Toolbar variant="dense">
          <Typography
            variant="subtitle1"
            fontWeight="bolder"
            color="secondary"
            marginLeft="auto"
          >
            {tt('lbl-duration', { duration })}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
