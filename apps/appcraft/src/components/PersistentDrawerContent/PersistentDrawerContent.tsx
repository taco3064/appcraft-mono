import Container from '@mui/material/Container';
import { useRef } from 'react';

import { SizedDrawer } from '~appcraft/styles';
import type { PersistentDrawerContentProps } from './PersistentDrawerContent.types';

export default function PersistentDrawerContent({
  ContentProps,
  DrawerProps,
  children,
  disablePadding = false,
  drawer,
  height,
  open,
  ...props
}: PersistentDrawerContentProps) {
  const { current: id } = useRef(Math.random().toFixed(7).replace('.', ''));

  return (
    <Container
      {...props}
      id={id}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: DrawerProps.anchor === 'right' ? 'row' : 'row-reverse',
        height: height || '100%',

        '& > [role=contentinfo]': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <SizedDrawer
        {...DrawerProps}
        variant="persistent"
        open={open}
        container={() => global.document?.getElementById(id)}
        PaperProps={{
          sx: (theme) => ({
            position: 'absolute',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration:
                theme.transitions.duration[
                  open ? 'enteringScreen' : 'leavingScreen'
                ],
            }),
          }),
        }}
      >
        {drawer}
      </SizedDrawer>

      <Container
        role="contentinfo"
        disableGutters
        {...ContentProps}
        maxWidth={false}
      >
        {children}
      </Container>

      {open && !disablePadding && (
        <Container disableGutters maxWidth={DrawerProps.maxWidth} />
      )}
    </Container>
  );
}
