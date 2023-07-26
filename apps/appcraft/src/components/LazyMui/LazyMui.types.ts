/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LazyExoticComponent } from 'react';

export type Mui = {
  category: 'data-display' | 'input' | 'layout' | 'navigation' | 'tool';
  widgets: {
    typeFile: string;
    typeName: string;
    component: LazyExoticComponent<any>;
  }[];
}[];
