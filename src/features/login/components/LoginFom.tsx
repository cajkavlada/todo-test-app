import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useLoginMutation} from '../store';
import {Button, VStack} from '@chakra-ui/react';
import {Credentials} from '../login.types';
import {useTranslation} from 'react-i18next';
import {PasswordInput} from 'src/components/Form/PasswordInput';
import {Input} from 'src/components/Form/Input';
import {ForwardIcon} from 'src/asserts/icons';

export function LoginForm() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const [login] = useLoginMutation();

  const schema = yup.object({
    username: yup.string().required(t('login.username.required')),
    password: yup
      .string()
      .min(4, t('login.password.lengthLimit'))
      .required(t('login.password.required')),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: 'atuny0',
      password: '9uQFF1Lh',
    },
  });

  async function onSubmit(credentials: Credentials) {
    const result = await login(credentials);
    if ('data' in result) {
      navigate('/');
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <VStack gap={6} align="stretch">
        <Input
          autoFocus
          error={errors.username}
          isRequired
          register={{...register('username')}}
          label={t('login.username.label')}
        />
        <PasswordInput
          isRequired
          error={errors.password}
          label={t('login.password.label')}
          register={register('password')}
        />
        <Button type="submit" rightIcon={<ForwardIcon />}>
          {t('login.submit')}
        </Button>
      </VStack>
    </form>
  );
}
