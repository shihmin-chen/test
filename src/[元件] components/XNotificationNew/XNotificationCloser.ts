import { useNotification } from '@kyvg/vue3-notification';

function XNotificationCloser(id: any) {
  const { notify } = useNotification();

  notify.close(id);
}

export default XNotificationCloser;
