import AppBar from '@mui/material/AppBar';
import Head from 'next/head';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/router';

import * as Hooks from '~appcraft/hooks';
import { CommonButton } from '~appcraft/components/common';
import { ConfigDetail } from '~appcraft/containers';
import { PageContainer, PlayTodoIcon } from '~appcraft/styles';

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [tt] = Hooks.useFixedT('todos');
  const { todo, variant, onVariantChange } = Hooks.useTodoConfig(id);
  const { superiors, breadcrumbs } = Hooks.useHierarchyFilter(category, id);

  const [action, handleActionNodePick] = Hooks.useNodePickHandle([
    'reset',
    'save',
  ]);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={tt('ttl-detail', { name: superiors[id] })}
      action={
        <>
          <CommonButton
            btnVariant="icon"
            icon={PlayTodoIcon}
            text={tt('btn-run')}
            onClick={() => console.log('test')}
          />

          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {tt('ttl-detail', { name: superiors[id] })}</title>
      </Head>

      <ConfigDetail
        key={`${id}:${todo.timestamp}:${variant}}`}
        typeName={todo.content.typeName}
        typeFile={todo.content.typeFile}
        data={todo}
        superiors={{ names: superiors, breadcrumbs }}
        onActionNodePick={handleActionNodePick}
        header={
          <AppBar
            position="sticky"
            elevation={0}
            sx={{ borderRadius: (theme) => theme.spacing(2) }}
          >
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
              <TextField
                select
                variant="outlined"
                size="small"
                label={tt('lbl-variant')}
                value={variant}
                onChange={onVariantChange}
                sx={{ width: (theme) => theme.spacing(28) }}
              >
                <MenuItem value="define">{tt('opt-define')}</MenuItem>
                <MenuItem value="fetch">{tt('opt-fetch')}</MenuItem>
                <MenuItem value="convert">{tt('opt-convert')}</MenuItem>
              </TextField>
            </Toolbar>
          </AppBar>
        }
      />
    </PageContainer>
  );
}
