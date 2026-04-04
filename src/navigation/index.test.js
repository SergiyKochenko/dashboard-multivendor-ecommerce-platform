import { getNav } from './index';

describe('getNav', () => {
  it('returns admin-only navigation items for admin role', () => {
    const navs = getNav('admin');

    expect(navs.length).toBeGreaterThan(0);
    expect(navs.every((item) => item.role === 'admin')).toBe(true);
  });

  it('returns seller-only navigation items for seller role', () => {
    const navs = getNav('seller');

    expect(navs.length).toBeGreaterThan(0);
    expect(navs.every((item) => item.role === 'seller')).toBe(true);
  });

  it('returns an empty array for unknown role', () => {
    expect(getNav('unknown')).toEqual([]);
  });
});
