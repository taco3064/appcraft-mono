import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Toolbar from '@mui/material/Toolbar';
import { TypesEditor } from '@appcraft/mui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';

import { Breadcrumbs } from '~appcraft/containers';
import { CommonButton } from '~appcraft/components/common';
import { ConfigData, upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './ConfigDetail.types';

const parser = {
  url: '/api/ts2-props/types-resolve/parse',
  method: 'POST' as const,
};

export default function ConfigDetail<C extends object = object>({
  category,
  data,
  superiors: { names, paths },
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
            IconProps={{ fontSize: 'large' }}
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
            IconProps={{ fontSize: 'large' }}
            btnVariant="icon"
            color="primary"
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
        onCustomize={(breadcrumbs) => {
          breadcrumbs.splice(
            1,
            1,
            ...paths.map((superior, i) => ({
              text: names[superior],
              url: {
                pathname: `/${category}`,
                query: {
                  superiors: paths.slice(0, i + 1),
                },
              },
            }))
          );

          return [...breadcrumbs, { text: names[data._id] }];
        }}
      />

      {Object.keys(action || {}).length > 0 && (
        <Toolbar
          disableGutters
          variant="dense"
          style={{ justifyContent: 'flex-end' }}
        >
          {action.reset}
          {action.save}
        </Toolbar>
      )}

      <Container maxWidth="sm">
        <TypesEditor
          {...{ typeFile, typeName, parser, mixedTypes, values }}
          InputStyles={{ size: 'small', variant: 'outlined' }}
          disableSelection
          onChange={setValues}
          onMixedTypeMapping={setMixedTypes}
        />
      </Container>
    </>
  );
}
