import i18n from '../../i18n/i18n';

type ActionNotification = {
  success?: string;
  error?: string;
  blockWhenContaining?: string;
};

export const notificationMessages: Record<string, ActionNotification> = {
  login: {
    error: i18n.t('login.fail'),
  },
  createTodo: {
    success: i18n.t('todo.create.success'),
    error: i18n.t('todo.create.fail'),
  },
  updateTodo: {
    success: i18n.t('todo.update.success'),
    error: i18n.t('todo.update.fail'),
    blockWhenContaining: 'completed',
  },
  deleteTodo: {
    success: i18n.t('todo.delete.success'),
    error: i18n.t('todo.delete.fail'),
  },
};
