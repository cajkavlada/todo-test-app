import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastId, useToast} from '@chakra-ui/react';

import {removeNotification, selectNotifications} from 'src/store/notifications/notificationSlice';

export function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const toast = useToast({
    isClosable: true,
    position: 'bottom-right',
  });

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!toast.isActive(notification.id as ToastId)) {
        toast({
          ...notification,
          onCloseComplete: () => dispatch(removeNotification(notification.id)),
        });
      }
    });
  }, [notifications]);

  return null;
}
