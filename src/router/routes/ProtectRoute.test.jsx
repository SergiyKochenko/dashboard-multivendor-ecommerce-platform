import { render, screen } from '@testing-library/react';
import ProtectRoute from './ProtectRoute';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Navigate: ({ to }) => <div data-testid="navigate" data-to={to} />,
}));

describe('ProtectRoute', () => {
  const child = <div>Allowed content</div>;

  const renderWithAuth = ({ role = null, userInfo = null, route }) => {
    useSelector.mockImplementation((selector) => selector({ auth: { role, userInfo } }));
    return render(<ProtectRoute route={route}>{child}</ProtectRoute>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login when role is not present', () => {
    renderWithAuth({ role: null, userInfo: null, route: { role: 'seller' } });

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login');
  });

  it('redirects to unauthorized when roles do not match', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'active' },
      route: { role: 'admin' },
    });

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/unauthorized');
  });

  it('renders children for matching role and matching status', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'active' },
      route: { role: 'seller', status: 'active' },
    });

    expect(screen.getByText('Allowed content')).toBeInTheDocument();
  });

  it('redirects pending seller when status does not match', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'pending' },
      route: { role: 'seller', status: 'active' },
    });

    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-to',
      '/seller/account-pending'
    );
  });

  it('redirects deactive seller when status does not match and not pending', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'deactive' },
      route: { role: 'seller', status: 'active' },
    });

    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-to',
      '/seller/account-deactive'
    );
  });

  it('renders children when visibility includes current status', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'deactive' },
      route: { role: 'seller', visibility: ['active', 'deactive'] },
    });

    expect(screen.getByText('Allowed content')).toBeInTheDocument();
  });

  it('redirects to pending page when visibility excludes current status', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'pending' },
      route: { role: 'seller', visibility: ['active'] },
    });

    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-to',
      '/seller/account-pending'
    );
  });

  it('renders children for seller ability routes', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'active' },
      route: { ability: 'seller' },
    });

    expect(screen.getByText('Allowed content')).toBeInTheDocument();
  });

  it('renders children when role matches and no status/visibility guards exist', () => {
    renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'active' },
      route: { role: 'seller' },
    });

    expect(screen.getByText('Allowed content')).toBeInTheDocument();
  });

  it('renders nothing when route expects role but user info is missing', () => {
    const { container } = renderWithAuth({
      role: 'seller',
      userInfo: null,
      route: { role: 'seller' },
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for non-seller ability route', () => {
    const { container } = renderWithAuth({
      role: 'seller',
      userInfo: { role: 'seller', status: 'active' },
      route: { ability: 'admin' },
    });

    expect(container).toBeEmptyDOMElement();
  });
});
