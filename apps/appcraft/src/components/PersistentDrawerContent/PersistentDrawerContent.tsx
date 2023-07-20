import Container from '@mui/material/Container';

import { SizedDrawer } from '~appcraft/styles';
import { useWidth } from '~appcraft/hooks';
import type { PersistentDrawerContentProps } from './PersistentDrawerContent.types';

export default function PersistentDrawerContent({
  ContentProps,
  DrawerProps,
  content,
  drawer,
  height,
  open,
  ...props
}: PersistentDrawerContentProps) {
  const width = useWidth();

  return (
    <Container
      {...props}
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: DrawerProps.anchor === 'right' ? 'row' : 'row-reverse',
        height: height?.(theme) || '100%',
        borderRadius: `${theme.spacing(2)} !important`,
        gap: theme.spacing(1.5),
        overflowX: 'hidden',
      })}
    >
      <SizedDrawer
        {...DrawerProps}
        variant="persistent"
        open={open}
        PaperProps={{
          sx: (theme) => ({
            position: 'absolute',
            height: '100%',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `${theme.spacing(2)} !important`,
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
        {...ContentProps}
        disableGutters
        maxWidth={false}
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: 'auto !important',
          borderRadius: `${theme.spacing(2)} !important`,
        })}
      >
        {content}
      </Container>

      {open && !/^(xs|sm)$/.test(width) && (
        <Container disableGutters maxWidth={DrawerProps.maxWidth} />
      )}
    </Container>
  );
}
