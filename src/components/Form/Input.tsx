import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormControlProps,
  Input as ChakraInput,
  Textarea,
} from '@chakra-ui/react';
import {FieldError, UseFormRegisterReturn} from 'react-hook-form';

export type InputProps = FormControlProps & {
  autoFocus?: boolean;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  label: string;
  textArea?: boolean;
};

export function Input({
  autoFocus,
  error,
  isRequired,
  register,
  label,
  textArea,
  ...props
}: InputProps) {
  const inputProps = {
    autoFocus,
    id: register.name,
    ...register,
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel htmlFor={register.name}>{label}</FormLabel>
      {textArea ? <Textarea {...inputProps} /> : <ChakraInput {...inputProps} />}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
