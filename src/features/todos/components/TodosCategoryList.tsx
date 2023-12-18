import {useSelector} from 'react-redux';
import {todosSelector, useFetchTodosQuery} from '../store/todosEndpoints';
import {selectUserId} from 'src/features/login/store';
import {Divider, Heading, VStack} from '@chakra-ui/react';
import {Todo} from './Todo';
import {EmptyTodos} from './EmptyTodos';
import {MotionBox} from 'src/components/MotionDiv';

type TodosCategoryListProps = {
  label: string;
  completed: boolean;
};

export function TodosCategoryList({label, completed}: TodosCategoryListProps) {
  const userId = useSelector(selectUserId);

  const {data: todos} = useFetchTodosQuery(userId, {
    selectFromResult: ({data}) => ({data: todosSelector(data, completed)}),
  });

  return (
    <VStack gap={6} align="stretch">
      {todos && todos.length > 0 && (
        <>
          <MotionBox motionKey="listHeader">
            <Heading variant="h2">{label}</Heading>
            <Divider mt={2} />
          </MotionBox>
          <VStack gap={4} align="stretch">
            {todos?.map((todo) => (
              <MotionBox key={todo.id} motionKey={todo.id} transition={{opacity: {delay: 0.1}}}>
                <Todo {...todo} />
              </MotionBox>
            ))}
          </VStack>
        </>
      )}
      {todos && todos.length === 0 && !completed && (
        <MotionBox motionKey="emptyState">
          <EmptyTodos />
        </MotionBox>
      )}
    </VStack>
  );
}
