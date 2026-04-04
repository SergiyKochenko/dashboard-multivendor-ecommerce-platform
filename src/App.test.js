import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_info } from './store/Reducers/authReducer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./router/Router', () => ({
  __esModule: true,
  default: ({ allRoutes }) => (
    <div data-testid="router-routes-count">{allRoutes.length}</div>
  ),
}));

jest.mock('./router/routes/publicRoutes', () => {
  const routes = [{ path: '/' }, { path: '/login' }];
  return {
    __esModule: true,
    default: routes,
  };
});

jest.mock('./router/routes', () => ({
  getRoutes: jest.fn(),
}));

jest.mock('./store/Reducers/authReducer', () => ({
  get_user_info: jest.fn(),
}));

describe('App', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('combines public and private routes and passes them to Router', async () => {
    const { getRoutes } = require('./router/routes');
    getRoutes.mockReturnValue({ path: '/private' });

    useSelector.mockImplementation((selector) =>
      selector({ auth: { token: null } })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('router-routes-count')).toHaveTextContent('3');
    });
  });

  it('dispatches get_user_info when token exists', async () => {
    const action = { type: 'auth/get_user_info' };
    const { getRoutes } = require('./router/routes');
    getRoutes.mockReturnValue({ path: '/private' });
    get_user_info.mockReturnValue(action);

    useSelector.mockImplementation((selector) =>
      selector({ auth: { token: 'token-value' } })
    );

    render(<App />);

    await waitFor(() => {
      expect(get_user_info).toHaveBeenCalledTimes(1);
    });
    expect(mockDispatch).toHaveBeenCalledWith(action);
  });

  it('does not dispatch get_user_info when token is missing', async () => {
    const { getRoutes } = require('./router/routes');
    getRoutes.mockReturnValue({ path: '/private' });

    useSelector.mockImplementation((selector) =>
      selector({ auth: { token: '' } })
    );

    render(<App />);

    await waitFor(() => {
      expect(get_user_info).not.toHaveBeenCalled();
    });
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
