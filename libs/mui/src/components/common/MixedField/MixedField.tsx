import { GapTypography } from '../../../styles';
import { useDisplayPropName } from '../../../hooks';
import type { MixedFieldProps } from './MixedField.types';

export default function MixedField({ icon: Icon, options }: MixedFieldProps) {
  const displayName = useDisplayPropName(options.propName);

  return (
    <GapTypography variant="subtitle1" color="text.primary">
      <Icon color="warning" />

      {displayName}
    </GapTypography>
  );
}
