import { FC } from 'react';
import {
  Input as CInput,
  Field,
  InputProps as CInputProps,
  InputGroup,
} from '@chakra-ui/react';

interface InputProps extends CInputProps {
  label?: string;
}

const Input: FC<InputProps> = ({ label, required, ...props }) => {
  return (
    <Field.Root required={required}>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>
      <CInput {...props} />
    </Field.Root>
  );
};

export default Input;
