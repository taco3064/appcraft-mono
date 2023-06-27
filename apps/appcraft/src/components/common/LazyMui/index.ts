import Mui from './LazyMui';

export const LazyMui = Mui.reduce((result, { widgets }) => {
  widgets.forEach(({ typeName, component }) => {
    result[typeName] = component;
  });

  return result;
}, {});

export const muiWidgets = Mui;

export const typeMap = Mui.reduce<Map<string, string>>(
  (result, { widgets }) => {
    widgets.forEach(({ typeFile, typeName }) => result.set(typeName, typeFile));

    return result;
  },
  new Map()
);
