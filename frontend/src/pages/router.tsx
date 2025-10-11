import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../layout/rootLayout';
import { LoginPage } from './login/login';
import { Register } from './register/register';
import { employeeRoutes } from './employee/route';
import { RoutePath } from './routePath';
import { Navigate } from 'react-router';
import { employerRoutes } from './employer/router';
import { RoleGuard } from '../components/routeGuard/roleGuard';
import { RoleEnum } from './register/enum';

const router = createBrowserRouter([
  {
    path: RoutePath.Login,
    index: true,
    element: <LoginPage />,
  },
  {
    path: RoutePath.Register,
    element: <Register />,
  },
  {
    path: '/*',
    element: <RootLayout />,
    children: [
      {
        path: RoutePath.Employee,
        children: employeeRoutes,
        element: <RoleGuard allowedRoles={[RoleEnum.Employee]}></RoleGuard>,
      },
      {
        path: RoutePath.Employer,
        element: <RoleGuard allowedRoles={[RoleEnum.Employer]}></RoleGuard>,
        children: employerRoutes,
      },
      {
        path: '*',
        element: <Navigate to={`/${RoutePath.Login}`} replace />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to={RoutePath.Login} replace />,
  },
]);

export const Pages = () => <RouterProvider router={router} />;
