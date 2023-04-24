import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import _get from 'lodash.get';
import _toPath from 'lodash.topath';

import { TypeItem } from '../TypeItem';
import { usePropPath } from '../InteractivedContext';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  superior,
  values,
  onPropPathChange,
}: TypeListProps) {
  const propPath = usePropPath();

  return (
    <List
      subheader={
        propPath && (
          <ListSubheader
            component={Toolbar}
            variant="dense"
            sx={{ background: 'inherit' }}
          >
            <Breadcrumbs separator=".">
              {_toPath(propPath).map((path, i, arr) => {
                const isArrayEl = Array.isArray(_get(values, arr.slice(0, i)));
                const isLast = i === arr.length - 1;

                return isLast ? (
                  <Typography
                    key={`${path}_${i}`}
                    variant="subtitle1"
                    color="primary"
                  >
                    {isArrayEl ? `[${path}]` : path}
                  </Typography>
                ) : (
                  <Link
                    key={`${path}_${i}`}
                    component="button"
                    underline="hover"
                    variant="subtitle1"
                    color="text.primary"
                    onClick={() =>
                      onPropPathChange(
                        arr
                          .slice(0, i + 1)
                          .reduce<string>((result, propName, index) => {
                            const isArrayEl = Array.isArray(
                              _get(values, arr.slice(0, index))
                            );

                            return isArrayEl
                              ? `${result}[${propName}]`
                              : `${result ? `${result}.` : ''}${propName}`;
                          }, '')
                      )
                    }
                  >
                    {isArrayEl ? `[${path}]` : path}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </ListSubheader>
        )
      }
    >
      {superior?.type === 'exact' &&
        Object.values(superior.options || {})
          .sort(({ type: t1, propName: p1 }, { type: t2, propName: p2 }) => {
            const s1 = `${t1}:${p1}`;
            const s2 = `${t2}:${p2}`;

            return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
          })
          .map((options) => (
            <TypeItem
              key={options.propName}
              options={options}
              onDisplayItemClick={({ type, propName }) => {
                if (type === 'arrayOf') {
                  onPropPathChange(`${propPath}[${propName}]`);
                } else {
                  onPropPathChange(
                    [propPath, propName].filter((v) => v).join('.')
                  );
                }
              }}
            />
          ))}
    </List>
  );
}
