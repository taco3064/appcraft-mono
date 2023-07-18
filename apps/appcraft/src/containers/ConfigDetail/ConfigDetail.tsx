import Container from '@mui/material/Container';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTypeEditor } from '@appcraft/mui';

import { Breadcrumbs } from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { Parser, getTypeDefinition } from '~appcraft/services';
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
  const [values, handleConfig] = useConfigValues(props);

  const actionNode = useNodePicker(
    () =>
      onActionNodePick({
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={ReplayIcon}
            text={at('btn-reset')}
            onClick={handleConfig.reset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={SaveAltIcon}
            text={at('btn-save')}
            onClick={handleConfig.save}
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
          values={values}
          onChange={handleConfig.change}
          onFetchDefinition={(...e) => getTypeDefinition(Parser.Config, ...e)}
        />
      </Container>
    </>
  );
}
