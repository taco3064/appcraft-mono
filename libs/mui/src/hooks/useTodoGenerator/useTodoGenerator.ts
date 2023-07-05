import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import type * as Appcraft from '@appcraft/types';

import { splitProps } from '../useWidgetGenerator';
import type { TodoGeneratorHook } from './useTodoGenerator.types';

const useTodoGenerator: TodoGeneratorHook = (typeFile) => {
  const [todo, setTodo] = useState<Appcraft.WidgetTodo | null>(null);

  return [
    {
      todo,
      config: useMemo(() => {
        switch (todo?.category) {
          case 'variable':
            return {
              category: 'config',
              typeFile,
              typeName: 'VariableTodo',
              props: splitProps(todo),
            };

          case 'fetch':
            return {
              category: 'config',
              typeFile,
              typeName: 'FetchTodo',
              props: splitProps(todo),
            };

          case 'branch':
            return {
              category: 'config',
              typeFile,
              typeName: 'ConditionBranchTodo',
              props: splitProps(todo),
            };

          case 'iterate':
            return {
              category: 'config',
              typeFile,
              typeName: 'IterateTodo',
              props: splitProps(todo),
            };

          default:
            return null;
        }
      }, [typeFile, todo]),
    },

    {
      cancel: () => setTodo(null),

      create: (category) => {
        const id = nanoid(4);

        switch (category) {
          case 'variable':
            return setTodo({
              category,
              id,
              description: '',
              variables: {},
            });

          case 'fetch':
            return setTodo({
              category,
              id,
              description: '',
              url: '',
              method: 'GET',
            });

          case 'branch':
            return setTodo({
              category,
              id,
              description: '',
              sources: [],
              branches: [],
            });

          case 'iterate':
            return setTodo({
              category,
              id,
              description: '',
              iterateTodo: '',
              source: {
                mode: 'extract',
                initial: {
                  sourceType: 'input',
                  key: '',
                },
              },
            });
        }
      },
    },
  ];
};

export default useTodoGenerator;
