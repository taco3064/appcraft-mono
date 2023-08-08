/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LazyExoticComponent } from 'react';

export type Category =
  | 'data-display'
  | 'input'
  | 'layout'
  | 'navigation'
  | 'tool';

export type Widgets = {
  category: Category;
  widgets: {
    typeFile: string;
    typeName: string;
    component: LazyExoticComponent<any>;
  }[];
}[];

export type LazyWidgetMap = Record<
  string,
  Widgets[number]['widgets'][number]['component']
>;
