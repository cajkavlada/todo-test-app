import {createBrowserRouter} from 'react-router-dom';
import {TodosListPage, loader as todosLoader} from '../pages/TodosListPage';
import {TodoDetailPage} from '../pages/TodoDetailPage';
import {ErrorBoundary} from '../components/ErrorBoundary';
import {LoginPage} from '../pages/LoginPage';
import {ProtectedRoute} from 'src/features/login/components/ProtectedRoute';
import {Layout} from 'src/components/Layout/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            loader: todosLoader,
            element: <TodosListPage />,
          },
          {
            path: '/create',
            element: <TodoDetailPage />,
          },
          {
            path: '/edit/:id',
            loader: todosLoader,
            element: <TodoDetailPage />,
          },
        ],
      },
    ],
  },
], {basename: '/todo-test-app'});
