import axios from 'axios';
import camelcase from 'camelcase-keys';
import Router from 'next/router';
import { notification } from 'antd';
import { eventEmitter } from 'lib/events';

const instance = axios.create({
  baseURL: '/api',
  maxRedirects: 0,
});

instance.interceptors.request.use(
  (config) => {
    // Add default params for api request as api requirement
    config.params = { ...config.params, api: true };

    if (config.params.requestName) {
      eventEmitter.emit(config.params.requestName, true);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  // Convert to camelcase for consistent coding style
  (response) => {
    if (response.config.responseType !== 'blob') {
      response.data = camelcase(response.data, { deep: true });
    }

    if (response.config.params.requestName) {
      eventEmitter.emit(response.config.params.requestName, false);
    }
    return response;
  },
  (error) => {
    // To be global error handle
    if (error.response.status === 401) {
      notification.warn({
        message: 'Your session has expired',
        description: 'Please login again',
      });
      Router.push('/login');
    } else {
      console.log(error);
      notification.error({
        message: 'Error',
        description: 'Error occured',
      });
    }

    if (error.response.config.params.requestName) {
      eventEmitter.emit(error.response.config.params.requestName, false);
    }

    return Promise.reject(error);
  },
);

export default instance;
