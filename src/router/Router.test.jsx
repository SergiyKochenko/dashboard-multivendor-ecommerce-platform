import { render, screen } from '@testing-library/react';
import Router from './Router';
import { useRoutes } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useRoutes: jest.fn(),
}));

describe('Router wrapper', () => {
  it('calls useRoutes with all routes and renders returned element', () => {
    const allRoutes = [{ path: '/' }, { path: '/login' }];
    useRoutes.mockReturnValue(<div data-testid="route-result">ok</div>);

    render(<Router allRoutes={allRoutes} />);

    expect(useRoutes).toHaveBeenCalledWith(allRoutes);
    expect(screen.getByTestId('route-result')).toBeInTheDocument();
  });
});
