import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { TypesEditor, TypesEditorProps } from '@appcraft/mui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';

import TYPES_PARSER from '~appcraft/assets/json/types-parser.json';
import { Breadcrumbs } from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { ConfigData, upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './ConfigDetail.types';

export default function ConfigDetail<C extends object = object>({
  data,
  superiors: { names, breadcrumbs },
  typeFile,
  typeName,
  onActionNodePick = (e) => e,
  onSave,
}: Types.ConfigDetailProps<C>) {
  const { enqueueSnackbar } = useSnackbar();
  const [, setTransition] = useTransition();
  const [at] = useFixedT('app');

  const [values, setValues] = useState(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  const [mixedTypes, setMixedTypes] = useState(() =>
    JSON.parse(JSON.stringify(data?.mapping || {}))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<C>,
    onSuccess: () => {
      enqueueSnackbar(at('txt-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  const { data: action } = useQuery({
    suspense: false,
    queryKey: [values, mixedTypes] as [Partial<C>, ConfigData<C>['mapping']],
    queryFn: () =>
      onActionNodePick({
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={RestartAltIcon}
            text={at('btn-reset')}
            onClick={() =>
              setTransition(() => {
                setValues(JSON.parse(JSON.stringify(data?.content || {})));
                setMixedTypes(JSON.parse(JSON.stringify(data?.mapping || {})));
              })
            }
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={SaveAltIcon}
            text={at('btn-save')}
            onClick={() =>
              mutation.mutate({ ...data, content: values, mapping: mixedTypes })
            }
          />
        ),
      }),
  });

  return (
    <>
      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        action={
          Object.values(action || {}).some((node) => node) && (
            <>
              {action.reset}
              {action.save}
            </>
          )
        }
        onCustomize={($breadcrumbs) => {
          $breadcrumbs.splice(1, 1, ...breadcrumbs);

          return [...breadcrumbs, { text: names[data._id] }];
        }}
      />

      <Container maxWidth="sm">
        <TypesEditor
          {...{ typeFile, typeName, mixedTypes, values }}
          disableSelection
          parser={TYPES_PARSER as TypesEditorProps['parser']}
          onChange={setValues}
          onMixedTypeMapping={setMixedTypes}
        />
      </Container>
    </>
  );
}
