import {Button, Stack, VStack} from '@chakra-ui/react';
import {Todo, TodoFormData} from '../todos.types';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useCreateTodoMutation, useUpdateTodoMutation} from '../store/todosEndpoints';
import {useSelector} from 'react-redux';
import {selectUserId} from 'src/features/login/store';
import {Input} from 'src/components/Form/Input';
import {CheckIcon} from 'src/asserts/icons';

export function TodoForm({todo, description, id}: Partial<Todo>) {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const userId = useSelector(selectUserId);

  const [updateTodo] = useUpdateTodoMutation();
  const [createTodo] = useCreateTodoMutation();

  const schema = yup.object({
    todo: yup.string().required(t('todo.name.required')),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {todo, description},
  });

  async function onSubmit(todoData: TodoFormData) {
    if (!todoData.description) {
      delete todoData.description;
    }
    if (id) {
      const result = await updateTodo({id, ...todoData});
      if ('data' in result) {
        navigate('/');
      }
    } else {
      const result = await createTodo({userId, ...todoData});
      if ('data' in result) {
        navigate('/');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <VStack gap={6} align="stretch">
        <Input
          autoFocus
          error={errors.todo}
          isRequired
          register={{...register('todo')}}
          label={t('todo.name.label')}
        />
        <Input
          error={errors.description}
          register={{...register('description')}}
          label={t('todo.description.label')}
          textArea
        />
        <Stack direction={['column', 'row']} justify="space-between">
          <Button colorScheme="gray" onClick={() => navigate('/')}>
            {id ? t('todo.update.cancel') : t('todo.create.cancel')}
          </Button>
          <Button type="submit" rightIcon={<CheckIcon />}>
            {id ? t('todo.update.submit') : t('todo.create.submit')}
          </Button>
        </Stack>
      </VStack>
    </form>
  );
}
