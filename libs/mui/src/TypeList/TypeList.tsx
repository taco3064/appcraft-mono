import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { TypeItem } from '../TypeItem';
import { usePropPath } from '../InteractivedContext';
import { usePropPathChange } from './TypeList.hooks';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  disableSelection,
  superior,
  values,
  onPropPathChange,
}: TypeListProps) {
  const propPath = usePropPath();

  const [breadcrumbs, { back: handleBack, to: handleTo }] = usePropPathChange(
    { values, onPropPathChange },
    propPath
  );

  return (
    <List
      subheader={
        propPath && (
          <ListSubheader
            component={Toolbar}
            variant="dense"
            sx={{ background: 'inherit', gap: 1 }}
          >
            <IconButton size="small" onClick={() => handleBack()}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>

            <Breadcrumbs separator=".">
              {breadcrumbs.map(({ name, isArrayElement, isLast }, i) =>
                isLast ? (
                  <Typography
                    key={`${name}_${i}`}
                    variant="subtitle1"
                    color="secondary"
                  >
                    {isArrayElement ? `[${name}]` : name}
                  </Typography>
                ) : (
                  <Link
                    key={`${name}_${i}`}
                    component="button"
                    underline="hover"
                    variant="subtitle1"
                    color="text.primary"
                    onClick={() => handleBack(i)}
                  >
                    {isArrayElement ? `[${name}]` : name}
                  </Link>
                )
              )}
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
              disableSelection={disableSelection}
              options={options}
              onDisplayItemClick={handleTo}
            />
          ))}
    </List>
  );
}
