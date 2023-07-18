import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTodoEditor } from '@appcraft/mui';

import * as Hooks from '~appcraft/hooks';
import FETCH_OPTIONS from '~appcraft/assets/json/types-fetch-options.json';
import { Breadcrumbs } from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { PlayTodoIcon } from '~appcraft/styles';
import type { TodoEditorProps } from './TodoEditor.types';

export default function TodoEditor({
  ContentProps,
  data,
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
  onSave,
}: TodoEditorProps) {
  const [at, ct, tt] = Hooks.useFixedT('app', 'appcraft', 'todos');

  const actionNode = Hooks.useNodePicker(
    () =>
      onActionNodePick({
        run: (
          <CommonButton
            btnVariant="icon"
            icon={PlayTodoIcon}
            text={tt('btn-run')}
          />
        ),
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={RestartAltIcon}
            text={at('btn-reset')}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={SaveAltIcon}
            text={at('btn-save')}
          />
        ),
      }),
    []
  );

  return (
    <>
      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        action={actionNode}
        onCustomize={([index]) => [
          index,
          ...breadcrumbs,
          { text: names[data._id] },
        ]}
      />

      <Container
        disableGutters
        maxWidth="lg"
        {...ContentProps}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CraftedTodoEditor
          fullHeight
          fixedT={ct}
          parser={FETCH_OPTIONS.CONFIGS_PARSER}
          typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
          values={{}}
          onChange={console.log}
        />
      </Container>
    </>
  );
}
