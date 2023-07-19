import Container from '@mui/material/Container';

import { SizedDrawer } from '~appcraft/styles';
import type { PersistentDrawerContentProps } from './PersistentDrawerContent.types';

export default function PersistentDrawerContent({
  ContentProps,
  DrawerProps,
  content,
  disablePadding = false,
  drawer,
  height,
  open,
  ...props
}: PersistentDrawerContentProps) {
  return (
    <Container
      {...props}
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: DrawerProps.anchor === 'right' ? 'row' : 'row-reverse',
        height: height?.(theme) || '100%',
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
        disableGutters
        {...ContentProps}
        maxWidth={false}
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',

          [theme.breakpoints.up('md')]: {
            marginRight: theme.spacing(1.5),
          },
        })}
      >
        {content}
      </Container>

      {open && !disablePadding && (
        <Container
          disableGutters
          maxWidth={DrawerProps.maxWidth}
          sx={(theme) => ({
            [theme.breakpoints.up('sm')]: {
              visibility: 'hidden',
            },
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          })}
        />
      )}
    </Container>
  );
}
