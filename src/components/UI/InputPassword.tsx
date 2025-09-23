import { FC } from 'react';
import { Field } from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { PasswordInputProps } from '../ui/password-input';

interface InputProps extends PasswordInputProps {
  label?: string;
}

const InputPassword: FC<InputProps> = ({ label, required, ...props }) => {
  return (
    <Field.Root required={required}>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>
      <PasswordInput {...props} />
    </Field.Root>
  );
};

export default InputPassword;
