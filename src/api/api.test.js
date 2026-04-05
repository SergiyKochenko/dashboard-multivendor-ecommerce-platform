describe('api instance', () => {
  const loadApi = () => {
    let api;
    jest.isolateModules(() => {
      api = require('./api').default;
    });
    return api;
  };

  afterEach(() => {
    delete process.env.REACT_APP_API_MODE;
    jest.resetModules();
  });

  it('uses localhost API in default mode', () => {
    const api = loadApi();

    expect(api.defaults.baseURL).toBe('http://localhost:5000/api');
  });

  it('enables credentials for requests', () => {
    const api = loadApi();

    expect(api.defaults.withCredentials).toBe(true);
  });

  it('uses production API in pro mode', () => {
    process.env.REACT_APP_API_MODE = 'pro';
    const api = loadApi();

    expect(api.defaults.baseURL).toBe(
      'https://backend-multivendor-ecommerce-platform.onrender.com/api'
    );
  });
});
