import { lazy } from 'react';
const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/Register'));
const AdminLogin = lazy(() => import('../../views/auth/AdminLogin'));
const Home = lazy(() => import('../../views/Home'));
const Error403 = lazy(() => import('../../views/errors/Error403'));
const Error404 = lazy(() => import('../../views/errors/Error404'));
const Error500 = lazy(() => import('../../views/errors/Error500'));

const Success = lazy(() => import('../../views/Success'));

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/403',
    element: <Error403 />,
  },
  {
    path: '/404',
    element: <Error404 />,
  },
  {
    path: '/500',
    element: <Error500 />,
  },
  {
    path: '/unauthorized',
    element: <Error403 />,
  },
  {
    path: '/success?',
    element: <Success />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
];

export default publicRoutes;
