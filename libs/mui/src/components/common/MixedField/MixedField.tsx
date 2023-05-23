import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

import { GapTypography } from '../../../styles';
import { useDisplayPropName } from '../../../hooks';
import type { MixedFieldProps } from './MixedField.types';

export default function MixedField({ options }: MixedFieldProps) {
  const displayName = useDisplayPropName(options.propName);

  return (
    <GapTypography variant="subtitle1" color="text.primary">
      <QuizOutlinedIcon color="warning" />

      {displayName}
    </GapTypography>
  );
}
