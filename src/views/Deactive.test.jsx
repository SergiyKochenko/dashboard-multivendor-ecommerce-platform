import { fireEvent, render, screen } from '@testing-library/react';
import Deactive from './Deactive';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/Reducers/authReducer';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Link: ({ children, to, className }) => (
    <a href={typeof to === 'string' ? to : '/'} className={className}>
      {children}
    </a>
  ),
  useNavigate: () => mockNavigate,
}));

jest.mock('../store/Reducers/authReducer', () => ({
  logout: jest.fn(),
}));

describe('Deactive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) =>
      selector({
        auth: {
          role: 'seller',
          loader: false,
          userInfo: {
            status: 'deactive',
            email: 'seller@example.com',
            shopInfo: {
              shopName: 'Trendy Shop',
            },
          },
        },
      })
    );

    logout.mockReturnValue({ type: 'auth/logout' });
  });

  it('renders the deactivated account message and support actions', () => {
    render(<Deactive />);

    expect(screen.getByText(/Your seller account is currently deactivated/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact Support/i })).toHaveAttribute(
      'href',
      '/seller/dashboard/chat-support'
    );
    expect(screen.getByRole('link', { name: /Open Profile/i })).toHaveAttribute(
      'href',
      '/seller/dashboard/profile'
    );
  });

  it('shows account summary details from user info', () => {
    render(<Deactive />);

    expect(screen.getByText(/Trendy Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/seller@example.com/i)).toBeInTheDocument();
    expect(screen.getAllByText(/deactive/i).length).toBeGreaterThan(0);
  });

  it('dispatches logout when sign out is clicked', () => {
    render(<Deactive />);

    fireEvent.click(screen.getByRole('button', { name: /Sign Out/i }));

    expect(logout).toHaveBeenCalledWith({ navigate: mockNavigate, role: 'seller' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/logout' });
  });
});
