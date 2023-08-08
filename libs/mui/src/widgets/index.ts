import _get from 'lodash/get';

import * as DataDisplay from './data-display';
import * as Input from './input';
import * as Layout from './layout';
import * as Navigation from './navigation';
import * as Tool from './tool';
import type { Category, LazyWidgetMap, Widgets } from './index.types';

const importation = {
  'data-display': DataDisplay,
  input: Input,
  layout: Layout,
  navigation: Navigation,
  tool: Tool,
};

export const MUI_WIDGETS: Widgets = Object.entries(importation).map(
  ([category, target]) => ({
    category: category as Category,
    widgets: Object.entries(target).map(([typeName, component]) => ({
      typeName,
      typeFile: `./node_modules/@appcraft/mui/src/widgets/${category}/${typeName}.d.ts`,
      component: component,
    })),
  })
);

export const LazyWidget = MUI_WIDGETS.reduce<LazyWidgetMap>(
  (result, { widgets }) => {
    widgets.forEach(({ typeName, component }) => {
      result[typeName] = component;
    });

    return result;
  },
  {}
);

export const typeMap = MUI_WIDGETS.reduce<Map<string, string>>(
  (result, { widgets }) => {
    widgets.forEach(({ typeFile, typeName }) => result.set(typeName, typeFile));

    return result;
  },
  new Map()
);
