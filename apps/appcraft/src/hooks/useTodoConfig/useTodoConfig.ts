import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProps } from '@appcraft/mui';
import { nanoid } from 'nanoid';
import type { ConfigData, ConfigOptions, WidgetTodo } from '@appcraft/types';

import { findConfig } from '~appcraft/services';
import type { TodoConfigResult, TodoVariant } from './useTodoConfig.types';

const useTodoConfig = (() => {
  function getTypeName(variant: TodoVariant) {
    switch (variant) {
      case 'branch':
        return 'ConditionBranchTodo';
      case 'fetch':
        return 'FetchTodo';
      case 'iterate':
        return 'IterateTodo';
      default:
        return 'VariableTodo';
    }
  }

  return <T extends WidgetTodo>(id: string): TodoConfigResult => {
    const { data, refetch } = useQuery({
      queryKey: [id],
      queryFn: findConfig<ConfigOptions>,
      refetchOnWindowFocus: false,
    });

    const { category: defaultVariant = 'variable' } = useMemo<T>(
      () => getProps(data.content),
      [data]
    );

    const [variant, setVariant] = useState<TodoVariant>(defaultVariant);

    return {
      variant,
      refetch,
      onVariantChange: (e) => setVariant(e.target.value as TodoVariant),

      todo: useMemo(() => {
        const props = (variant === defaultVariant && data.content?.props) || {};

        return {
          ...data,
          content: {
            ...data.content,
            category: 'config',
            typeFile: __WEBPACK_DEFINE__.TODO_TYPE_FILE,
            typeName: getTypeName(variant),
            props: {
              id: nanoid(4),
              ...props,
              category: variant,
            },
          },
        } as ConfigData<ConfigOptions>;
      }, [defaultVariant, variant, data]),
    };
  };
})();

export default useTodoConfig;
