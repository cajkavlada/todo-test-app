import {TodosLists} from 'src/features/todos/components/TodosLists';
import {fetchTodos} from 'src/features/todos/store/todosEndpoints';
import createLoader from 'src/utils/createLoader';
import {store} from '../store';
import {PageContainer} from 'src/components/Layout/PageContainer';
import {TodosHeading} from 'src/features/todos/components/TodosHeading';

export function TodosListPage() {
  return (
    <PageContainer>
      <TodosHeading />
      <TodosLists />
    </PageContainer>
  );
}

export function loader() {
  const userId = store.getState().auth?.id;
  if (!userId) {
    return null;
  }
  return createLoader(fetchTodos, userId);
}
