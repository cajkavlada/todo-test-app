import {PayloadAction, createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit';
import {notificationMessages} from './notificationMessages';
import {UseToastOptions} from '@chakra-ui/react';
import {ActionErrorPayload, ActionMeta, RequestStatus} from '../store.types';
import {RootState} from '../store';

const notificationsAdapter = createEntityAdapter<UseToastOptions>();

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    removeNotification: (state, {payload}) => {
      notificationsAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilledActionWithNotification,
      (state, {meta}: PayloadAction<unknown, string, ActionMeta>) => {
        const notification: UseToastOptions = {
          id: meta.requestId,
          title: notificationMessages[meta.arg.endpointName].success,
          status: 'success',
        };
        notificationsAdapter.addOne(state, notification);
      }
    );
    builder.addMatcher(
      isRejectedActionWithNotification,
      (state, {meta, payload}: PayloadAction<ActionErrorPayload, string, ActionMeta>) => {
        console.log(payload);
        const notification: UseToastOptions = {
          id: meta.requestId,
          title: notificationMessages[meta.arg.endpointName].error,
          description:
            payload?.status === 'FETCH_ERROR' ? 'Failed to connect' : payload?.data?.message,
          status: 'error',
        };
        notificationsAdapter.addOne(state, notification);
      }
    );
  },
});

function isFulfilledActionWithNotification({meta}: PayloadAction<unknown, string, ActionMeta>) {
  if (!meta || meta.requestStatus !== RequestStatus.FULFILLED) {
    return false;
  }
  const notification = notificationMessages[meta.arg.endpointName];
  if (!notification?.success) {
    return false;
  }
  return (
    !notification?.blockWhenContaining ||
    !(notification.blockWhenContaining in meta.arg.originalArgs)
  );
}

function isRejectedActionWithNotification({meta}: PayloadAction<unknown, string, ActionMeta>) {
  return (
    meta &&
    meta.requestStatus === RequestStatus.REJECTED &&
    !!notificationMessages[meta.arg.endpointName]?.error
  );
}

export const {removeNotification} = notificationSlice.actions;

export const selectNotifications = createSelector(
  (state: RootState) => notificationsAdapter.getSelectors().selectAll(state.notifications),
  (notifications) => notifications
);
