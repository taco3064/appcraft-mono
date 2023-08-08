import Slider from '@mui/material/Slider';
import type { ComponentProps } from 'react';

export { Slider };

export type SliderProps = Pick<
  ComponentProps<typeof Slider>,
  | 'color'
  | 'defaultValue'
  | 'disabled'
  | 'disableSwap'
  | 'marks'
  | 'max'
  | 'min'
  | 'name'
  | 'onChange'
  | 'orientation'
  | 'scale'
  | 'size'
  | 'step'
  | 'tabIndex'
  | 'track'
  | 'value'
  | 'valueLabelDisplay'
  | 'valueLabelFormat'
>;
