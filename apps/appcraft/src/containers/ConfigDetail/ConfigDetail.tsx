import Container from '@mui/material/Container';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTypeEditor } from '@appcraft/mui';

import TYPES_FETCH_OPTIONS from '~appcraft/assets/json/types-fetch-options.json';
import { Breadcrumbs } from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { useConfigValues } from './ConfigDetail.hooks';
import { useFixedT, useNodePicker } from '~appcraft/hooks';
import type { ConfigDetailProps } from './ConfigDetail.types';

export default function ConfigDetail({
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
  ...props
}: ConfigDetailProps) {
  const [at, ct] = useFixedT('app', 'appcraft');
  const { data } = props;
  const { values, onChange, onReset, onSave } = useConfigValues(props);

  console.log(values);

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
        <CraftedTypeEditor
          disableSelection
          fixedT={ct}
          parser={TYPES_FETCH_OPTIONS.parser as object}
          values={values}
          onChange={onChange}
        />
      </Container>
    </>
  );
}
