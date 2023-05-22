import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { forwardRef } from 'react';

const NumberInput = forwardRef<HTMLInputElement, NumericFormatProps>(
  (props, ref) => (
    <NumericFormat {...props} thousandSeparator getInputRef={ref} />
  )
);

NumberInput.displayName = 'NumberInput';
export default NumberInput;
