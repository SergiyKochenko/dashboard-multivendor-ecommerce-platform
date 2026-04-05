import { render, screen } from '@testing-library/react';
import Pending from './Pending';

describe('Pending', () => {
  it('renders pending approval content', () => {
    render(<Pending />);

    expect(screen.getByText(/Pending Approval/i)).toBeInTheDocument();
    expect(screen.getByText(/currently pending review/i)).toBeInTheDocument();
  });
});
