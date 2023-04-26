import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

import { GapTypography } from './TypeFields.styles';
import type { MixedFieldProps } from './TypeFields.types';

export default function MixedField({ options }: MixedFieldProps) {
  return (
    <GapTypography variant="subtitle1" color="text.primary">
      <QuizOutlinedIcon color="warning" />

      {options.propName}
    </GapTypography>
  );
}
