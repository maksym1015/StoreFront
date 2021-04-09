import { notification } from 'antd';

export default function handleAjaxNotification(data: any) {
  if (data && data.notifications) {
    for (let response of Object.values(data.notifications) as any[]) {
      if (response) {
        const noti = {
          message: response.title,
          description: response.message,
        };

        if (response.type === 'E') {
          notification.error(noti);
        }

        if (response.type === 'N') {
          notification.info(noti);
          return Promise.resolve();
        }

        if (response.type === 'W') {
          notification.warn(noti);
        }
      }
    }
  }

  return Promise.reject();
}
