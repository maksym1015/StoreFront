import Repository from './Repository';
import { AppInitResponse } from 'types/app';

export default {
  async init(): Promise<AppInitResponse> {
    return (
      await Repository.get('/v2', {
        params: {
          object: 'init',
        },
      })
    ).data;
  },

  async login(email: string, password: string) {
    const formData = new FormData();

    formData.append('user_login', email);
    formData.append('password', password);
    formData.append('is_ajax', '1');
    formData.append('dispatch[auth.login]', 'Sign in');

    const data = await Repository.post('/v2', formData, {
      headers: {
        'x-login': '1',
      },
    });

    return !!data.headers['x-loggedin'];
  },
};
