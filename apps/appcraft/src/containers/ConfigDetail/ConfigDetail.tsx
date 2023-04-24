import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Toolbar from '@mui/material/Toolbar';
import { Dispatch, useState } from 'react';
import { TypesEditor } from '@appcraft/mui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { Breadcrumbs } from '~appcraft/containers';
import { CommonButton } from '~appcraft/components/common';
import { upsertConfig } from '~appcraft/services';
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
  onActionNodePick = (e) => e,
}: Types.ConfigDetailProps<C>) {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');

  const [values, setValues] = useState(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<C>,
    onSuccess: () =>
      enqueueSnackbar(at('txt-succeed-update'), { variant: 'success' }),
  });

  const { data: action } = useQuery({
    suspense: false,
    queryKey: [values, setValues] as [Partial<C>, Dispatch<Partial<C>>],
    queryFn: () =>
      onActionNodePick({
        reset: (
          <CommonButton
            IconProps={{ fontSize: 'large' }}
            btnVariant="icon"
            icon={RestartAltIcon}
            text={at('btn-reset')}
            onClick={() => setValues(data.content)}
          />
        ),
        save: (
          <CommonButton
            IconProps={{ fontSize: 'large' }}
            btnVariant="icon"
            color="primary"
            icon={SaveAltIcon}
            text={at('btn-save')}
            onClick={() => mutation.mutate({ ...data, content: values })}
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
          InputStyles={{ size: 'small', variant: 'outlined' }}
          disableSelection
          parser={parser}
          values={values}
          typeName="DataSource"
          typeFile="./node_modules/@appcraft/types/src/services/data-source.types.d.ts"
          onChange={setValues}
        />
      </Container>
    </>
  );
}
