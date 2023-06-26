import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProps } from '@appcraft/mui';
import { nanoid } from 'nanoid';
import type { ConfigData, ConfigOptions, TodoEvent } from '@appcraft/types';

import { findConfig } from '~appcraft/services';
import type { TodoConfigResult, TodoVariant } from './useTodoConfig.types';

// const typeFile = './node_modules/@appcraft/types/src/widgets/todo.types.d.ts';
const typeFile = './libs/types/src/widgets/todo.types.ts';

const useTodoConfig = <T extends TodoEvent>(id: string): TodoConfigResult => {
  const { data, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<ConfigOptions>,
    refetchOnWindowFocus: false,
  });

  const { category: defaultVariant = 'define' } = useMemo<T>(
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

      switch (variant) {
        case 'define':
          return {
            ...data,
            content: {
              ...data.content,
              category: 'config',
              typeFile,
              typeName: 'DefineTodoEvent',
              props: {
                outputKey: nanoid(4),
                ...props,
                category: 'define',
              },
            },
          } as ConfigData<ConfigOptions>;

        case 'fetch':
          return {
            ...data,
            content: {
              ...data.content,
              category: 'config',
              typeFile,
              typeName: 'FetchTodoEvent',
              props: {
                outputKey: nanoid(4),
                ...props,
                category: 'fetch',
              },
            },
          } as ConfigData<ConfigOptions>;

        default:
          return {
            ...data,
            content: {
              ...data.content,
              category: 'config',
              typeFile,
              typeName: 'ConvertTodoEvent',
              props: {
                outputKey: nanoid(4),
                ...props,
                category: 'convert',
              },
            },
          } as ConfigData<ConfigOptions>;
      }
    }, [defaultVariant, variant, data]),
  };
};

export default useTodoConfig;
