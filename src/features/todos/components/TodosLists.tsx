import {useTranslation} from 'react-i18next';
import {TodosCategoryList} from './TodosCategoryList';

export function TodosLists() {
  const {t} = useTranslation();

  return (
    <>
      <TodosCategoryList label={t('todos.pending.heading')} completed={false} />
      <TodosCategoryList label={t('todos.completed.heading')} completed />
    </>
  );
}
