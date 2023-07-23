import { forwardRef, useImperativeHandle, useState } from 'react';

import type * as Types from './StateList.types';

const StateList = forwardRef<Types.StateValues, Types.StateListProps>(
  ({ open, state }, ref) => {
    const [values, setValues] = useState<Types.StateValues>(state || {});

    useImperativeHandle(ref, () => values, [values]);

    return !open ? null : <>TET</>;
  }
);

export default StateList;
