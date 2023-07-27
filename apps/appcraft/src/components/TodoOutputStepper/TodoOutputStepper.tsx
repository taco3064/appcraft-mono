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
import type { TodoOutputStepperProps } from './TodoOutputStepper.types';

export default function TodoOutputStepper({
  fullHeight = false,
  title,
  duration,
  logs,
  todos,
}: TodoOutputStepperProps) {
  const [tt] = Hook.useFixedT('todos');

  const [active, setActive] = useState<number[]>(
    new Array(logs?.length || 0).fill(0)
  );

  return (
    <>
      {title && (
        <AppBar color="default" position="static">
          <Toolbar variant="regular">{title}</Toolbar>
        </AppBar>
      )}

      <Container
        {...(fullHeight && {
          style: { height: '100%', overflow: 'hidden auto' },
        })}
      >
        {!logs?.length && (
          <Typography
            variant="h6"
            color="text.secondary"
            justifyContent="center"
            marginY={4}
          >
            {tt('msg-no-logs')}
          </Typography>
        )}

        {logs?.map((outputs, i) => (
          <Stepper
            key={`log-${i}`}
            nonLinear
            orientation="vertical"
            activeStep={active[i]}
          >
            {outputs.map(({ id, output }, ii) => (
              <Step key={id}>
                <StepButton
                  optional={
                    <Typography variant="caption" color="text.secondary">
                      {id}
                    </Typography>
                  }
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
                    <JSONTree hideRoot theme="monokai" data={output} />
                  </Collapse>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        ))}
      </Container>

      <AppBar
        color="transparent"
        position="static"
        elevation={0}
        style={{ marginTop: 'auto' }}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h6"
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
