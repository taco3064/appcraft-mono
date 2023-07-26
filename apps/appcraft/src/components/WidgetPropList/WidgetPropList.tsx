import _get from 'lodash/get';

import type { WidgetPropListProps } from './WidgetPropList.types';

export default function WidgetPropList({ widget }: WidgetPropListProps) {
  const state = _get(widget, 'content.state');

  // useEffect(() => {
  //   axios
  //     .get('https://api.github.com/users')
  //     .then(({ data }) => console.log(data));
  // }, []);

  return null;
}
