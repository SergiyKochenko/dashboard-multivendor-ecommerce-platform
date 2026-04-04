import { getRoutes } from './index';
import { privateRoutes } from './privateRoutes';
import MainLayout from '../../layout/MainLayout';
import ProtectRoute from './ProtectRoute';

describe('getRoutes', () => {
  it('returns root route with MainLayout and private children', () => {
    const routes = getRoutes();

    expect(routes.path).toBe('/');
    expect(routes.element.type).toBe(MainLayout);
    expect(routes.children).toBe(privateRoutes);
  });

  it('wraps private route elements in ProtectRoute', () => {
    getRoutes();

    expect(privateRoutes.length).toBeGreaterThan(0);
    privateRoutes.forEach((route) => {
      expect(route.element.type).toBe(ProtectRoute);
      expect(route.element.props.route).toBe(route);
    });
  });
});
