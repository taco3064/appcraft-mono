import List from '@mui/material/List';

import { TypeItem } from '../TypeItem';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({ superior }: TypeListProps) {
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
              onDisplayItemClick={({ type }) => {
                // setPropPath
              }}
            />
          ))}
    </List>
  );
}
