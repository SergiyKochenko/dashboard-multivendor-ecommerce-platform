import { render, screen } from '@testing-library/react';
import UnAuthorized from './UnAuthorized';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to, className }) => (
    <a href={typeof to === 'string' ? to : '/'} className={className}>
      {children}
    </a>
  ),
}));

describe('UnAuthorized', () => {
  it('renders unauthorized message and home link', () => {
    render(<UnAuthorized />);

    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to Home/i })).toHaveAttribute('href', '/');
  });
});
