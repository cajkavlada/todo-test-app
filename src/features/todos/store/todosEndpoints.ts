import {EntityState, createEntityAdapter, createSelector} from '@reduxjs/toolkit';
import {RootState, apiSlice} from '../../../store';
import {Todo, ListApiResponse, PatchTodo, TodoFormData} from '../todos.types';
import {selectUserId} from 'src/features/login/store';

export const todosAdapter = createEntityAdapter<Todo>();

let idIncrement = 0; // incrementing new todos id (DummyJson return 151 everytime)

export const todosEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTodos: builder.query<EntityState<Todo>, number | undefined>({
      query: (userId) => ({
        url: `/todos/user/${userId}`,
        params: {limit: 0},
      }),
      transformResponse: (response: ListApiResponse<Todo, 'todos'>) =>
        todosAdapter.setAll(todosAdapter.getInitialState(), response.todos),
    }),
    createTodo: builder.mutation<Todo, TodoFormData>({
      query: (todoData) => ({
        url: `/todos/add`,
        method: 'POST',
        body: {...todoData, completed: false},
      }),
      onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
        try {
          const {data} = await queryFulfilled;
          dispatch(
            todosEndpoints.util.updateQueryData(`fetchTodos`, data.userId, (draft) => {
              todosAdapter.addOne(draft, {...data, id: data.id + idIncrement});
            })
          );
          idIncrement++;
        } catch (err) {}
      },
    }),
    updateTodo: builder.mutation<Todo, PatchTodo>({
      query: ({id, ...body}) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async (data, {dispatch, queryFulfilled, getState}) => {
        const userId = selectUserId(getState() as RootState);
        const patchResult = dispatch(
          todosEndpoints.util.updateQueryData(`fetchTodos`, userId, (draft) => {
            todosAdapter.updateOne(draft, {id: data.id, changes: data});
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, {dispatch, queryFulfilled, getState}) => {
        const userId = selectUserId(getState() as RootState);
        const patchResult = dispatch(
          todosEndpoints.util.updateQueryData(`fetchTodos`, userId, (draft) => {
            todosAdapter.removeOne(draft, id);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const todosSelector = createSelector(
  (data: EntityState<Todo> | undefined, completed: boolean) => ({data, completed}),
  ({data, completed}) =>
    data
      ? todosAdapter
          .getSelectors()
          .selectAll(data)
          .filter((todo) => todo.completed === completed)
      : undefined
);

export const todoDetailSelector = createSelector(
  (data: EntityState<Todo> | undefined, id: string | undefined) => ({data, id}),
  ({data, id}) => {
    if (!data || !id) {
      return undefined;
    }
    return todosAdapter.getSelectors().selectById(data, Number(id));
  }
);

export const {
  endpoints: {fetchTodos},
  useFetchTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosEndpoints;
