import {Heading, IconButton, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {BackIcon} from 'src/asserts/icons';
import {PageContainer} from 'src/components/Layout/PageContainer';
import {selectUserId} from 'src/features/login/store';
import {TodoForm} from 'src/features/todos/components/TodoForm';
import {todoDetailSelector, useFetchTodosQuery} from 'src/features/todos/store/todosEndpoints';

export function TodoDetailPage() {
  const {t} = useTranslation();
  const {id} = useParams();
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);
  const {data: todo} = useFetchTodosQuery(userId, {
    selectFromResult: ({data}) => ({data: todoDetailSelector(data, id)}),
  });

  return (
    <PageContainer>
      <Stack direction={['column', 'row']} gap={[2, 4]} align={['start', 'center']}>
        <IconButton
          aria-label="back"
          colorScheme="gray"
          isRound
          icon={<BackIcon />}
          onClick={() => navigate('/')}
        />
        <Heading variant="h1">{todo?.todo ?? t('todo.create.heading')}</Heading>
      </Stack>
      <TodoForm {...todo} />
    </PageContainer>
  );
}
