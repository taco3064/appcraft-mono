import type * as Types from './prop-path.types';

const regs: RegExp[] = [
  /^(node|element)$/,
  /^(array|arrayOf|exact|object|objectOf)$/,
  /^(oneOfType)$/,
  /^(bool|instanceOf|number|oneOf|string)$/,
];

export const getPropOrderSeq: Types.GetPropOrderSeq = (type) =>
  regs.findIndex((value) => value.test(type));

export const getPropPath: Types.GetPropPath = (paths) =>
  paths.reduce<string>((result, propName) => {
    if (/^\d+$/.test(propName.toString())) {
      return `${result}[${propName}]`;
    } else if (/^\[\d+\]$/.test(propName.toString())) {
      return `${result}${propName}`;
    }

    return `${result ? `${result}.` : ''}${propName}`;
  }, '');

export const sortPropPaths = <E = string>(
  paths: E[],
  getPath: (el: E) => string = (el) => el as string
) =>
  paths.sort((e1, e2) => {
    const p1 = getPath(e1);
    const p2 = getPath(e2);
    const c1 = p1.match(/\./g)?.length || 0;
    const c2 = p2.match(/\./g)?.length || 0;

    return c1 - c2 || (p1 > p2 ? 1 : p1 < p2 ? -1 : 0);
  });
