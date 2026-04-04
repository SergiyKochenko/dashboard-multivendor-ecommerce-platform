import api from './api';

describe('api instance', () => {
  it('uses localhost API in dev mode', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:5000/api');
  });

  it('enables credentials for requests', () => {
    expect(api.defaults.withCredentials).toBe(true);
  });
});
