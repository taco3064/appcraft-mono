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

import { useFixedT } from '~appcraft/contexts';
import type { TodoOutputStepperProps } from './TodoOutputStepper.types';

export default function TodoOutputStepper({
  fullHeight = false,
  title,
  duration,
  outputs,
  todos,
}: TodoOutputStepperProps) {
  const [tt] = useFixedT('todos');
  const [active, setActive] = useState<number>(0);

  return (
    <>
      {title && (
        <AppBar color="default" position="sticky">
          <Toolbar variant="regular">{title}</Toolbar>
        </AppBar>
      )}

      <Container
        {...(fullHeight && {
          style: { height: '100%', overflow: 'hidden auto' },
        })}
      >
        {!outputs?.length && (
          <Typography
            variant="h6"
            color="text.secondary"
            justifyContent="center"
            marginY={4}
          >
            {tt('msg-no-logs')}
          </Typography>
        )}

        <Stepper nonLinear orientation="vertical" activeStep={active}>
          {outputs?.map(({ todo: id, alias = id, output }, i) => (
            <Step key={id}>
              <StepButton
                optional={
                  <Typography variant="caption" color="text.secondary">
                    {alias}
                  </Typography>
                }
                onClick={() => setActive(i)}
              >
                {todos[id].description}
              </StepButton>

              <StepContent>
                <Collapse in={active === i}>
                  <JSONTree hideRoot theme="monokai" data={output} />
                </Collapse>
              </StepContent>
            </Step>
          ))}
        </Stepper>
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
            {tt('lbl-duration', { duration: duration / 1000 })}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
