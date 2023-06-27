import Container from '@mui/material/Container';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTypeEditor } from '@appcraft/mui';

import FETCH_OPTIONS from '~appcraft/assets/json/types-fetch-options.json';
import { Breadcrumbs } from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { useConfigValues } from '~appcraft/hooks';
import { useFixedT, useNodePicker } from '~appcraft/hooks';
import type { ConfigDetailProps } from './ConfigDetail.types';

export default function ConfigDetail({
  header,
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
  ...props
}: ConfigDetailProps) {
  const [at, ct] = useFixedT('app', 'appcraft');
  const { data } = props;
  const { values, onChange, onReset, onSave } = useConfigValues(props);

  const actionNode = useNodePicker(
    () =>
      onActionNodePick({
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={ReplayIcon}
            text={at('btn-reset')}
            onClick={onReset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={SaveAltIcon}
            text={at('btn-save')}
            onClick={onSave}
          />
        ),
      }),
    [values]
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

      <Container maxWidth="sm">
        {header}

        <CraftedTypeEditor
          fixedT={ct}
          parser={FETCH_OPTIONS.CONFIGS}
          values={values}
          onChange={onChange}
        />
      </Container>
    </>
  );
}
