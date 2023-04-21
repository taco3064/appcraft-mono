import List from '@mui/material/List';

import { TypeItem } from '../TypeItem';
import { usePropPath } from '../InteractivedContext';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  superior,
  onPropPathChange,
}: TypeListProps) {
  const propPath = usePropPath();

  return (
    <List>
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
