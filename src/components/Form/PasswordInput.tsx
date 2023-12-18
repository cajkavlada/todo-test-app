import {useState} from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import {InputProps} from './Input';
import {HideIcon, ShowIcon} from 'src/asserts/icons';

export function PasswordInput({error, isRequired, register, label, ...props}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword((prevValue) => !prevValue);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel htmlFor={register.name}>{label}</FormLabel>
      <InputGroup>
        <Input type={showPassword ? 'text' : 'password'} id={register.name} {...register} />
        <InputRightElement>
          <IconButton
            size="sm"
            colorScheme="gray"
            variant="ghost"
            isRound
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            icon={showPassword ? <HideIcon /> : <ShowIcon />}
            onClick={handleToggle}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
