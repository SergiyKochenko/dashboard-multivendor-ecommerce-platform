import { privateRoutes } from './privateRoutes';
import { adminRoutes } from './adminRoutes';
import { sellerRoutes } from './sellerRoutes';

describe('privateRoutes', () => {
  it('combines admin and seller routes', () => {
    expect(privateRoutes.length).toBe(adminRoutes.length + sellerRoutes.length);
  });

  it('contains known admin and seller dashboard paths', () => {
    const paths = privateRoutes.map((route) => route.path);

    expect(paths).toContain('admin/dashboard');
    expect(paths).toContain('/seller/dashboard');
  });
});
