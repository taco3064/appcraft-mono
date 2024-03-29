import Container from '@mui/material/Container';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTypeEditor } from '@appcraft/craftsman';

import Breadcrumbs from '../Breadcrumbs';
import { CommonButton } from '~appcraft/components';
import { getTypeDefinition } from '~appcraft/services';
import { useFixedT, useNodePicker } from '~appcraft/hooks';
import { useConfigValues } from '~appcraft/hooks';
import type { ConfigDetailProps } from './ConfigDetail.types';

export default function ConfigDetail({
  header,
  superiors,
  renderOverrideItem,
  onActionNodePick = (e) => e,
  ...props
}: ConfigDetailProps) {
  const [at] = useFixedT('app');
  const { data } = props;
  const [values, handleConfig] = useConfigValues(props);

  const actionNode = useNodePicker(
    () =>
      onActionNodePick({
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={<ReplayIcon />}
            text={at('btn-reset')}
            onClick={handleConfig.reset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handleConfig.save}
          />
        ),
      }),
    [values]
  );

  return (
    <>
      {superiors && (
        <Breadcrumbs
          ToolbarProps={{ disableGutters: true }}
          action={actionNode}
          onCustomize={([index]) => [
            index,
            ...superiors.breadcrumbs,
            { text: superiors.names[data._id] },
          ]}
        />
      )}

      <Container maxWidth="sm">
        {header}

        <CraftedTypeEditor
          values={values}
          renderOverrideItem={renderOverrideItem}
          onChange={handleConfig.change}
          onFetchDefinition={getTypeDefinition}
        />
      </Container>
    </>
  );
}
