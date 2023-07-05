import { useState } from 'react';
import { nanoid } from 'nanoid';
import type * as Appcraft from '@appcraft/types';

import { splitProps } from '../useWidgetGenerator';
import type { TodoGeneratorHook, ValuesState } from './useTodoGenerator.types';

const useTodoGenerator: TodoGeneratorHook = (typeFile) => {
  const [values, setValues] = useState<ValuesState>(null);

  return [
    values,

    {
      cancel: () => setValues(null),

      change: (config) =>
        setValues({ todo: values?.todo as Appcraft.WidgetTodo, config }),

      create: (category) => {
        const data: Pick<Appcraft.WidgetTodo, 'description' | 'id'> = {
          id: nanoid(4),
          description: '',
        };

        switch (category) {
          case 'variable': {
            const todo: Appcraft.VariableTodo = {
              ...data,
              category,
              variables: {},
            };

            return setValues({
              todo,
              config: {
                category: 'config',
                typeFile,
                typeName: 'VariableTodo',
                props: splitProps(todo),
              },
            });
          }
          case 'fetch': {
            const todo: Appcraft.FetchTodo = {
              ...data,
              category,
              url: '',
              method: 'GET',
            };

            return setValues({
              todo,
              config: {
                category: 'config',
                typeFile,
                typeName: 'FetchTodo',
                props: splitProps(todo),
              },
            });
          }
          case 'branch': {
            const todo: Appcraft.ConditionBranchTodo = {
              ...data,
              category,
              sources: [],
              branches: [],
            };

            return setValues({
              todo,
              config: {
                category: 'config',
                typeFile,
                typeName: 'ConditionBranchTodo',
                props: splitProps(todo),
              },
            });
          }
          case 'iterate': {
            const todo: Appcraft.IterateTodo = {
              ...data,
              category,
              iterateTodo: '',
              source: {
                mode: 'extract',
                initial: {
                  sourceType: 'input',
                  key: '',
                },
              },
            };

            return setValues({
              todo,
              config: {
                category: 'config',
                typeFile,
                typeName: 'IterateTodo',
                props: splitProps(todo),
              },
            });
          }
        }
      },
    },
  ];
};

export default useTodoGenerator;
