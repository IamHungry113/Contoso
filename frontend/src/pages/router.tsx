import { Routes, Navigate, Route } from 'react-router';
import { LoginPage } from './login/login';
import { Register } from './register/register';
import { RoutePath } from './routePath';
import RoleGuard from '../components/routeGuard/guard';
import { RoleEnum } from './register/enum';
import { EmployeeRoute } from './employee/route';

export const Pages = () => {
  return (
    <Routes>
      <Route
        path={RoutePath.Login}
        element={
          <RoleGuard allowedRoles={[]}>
            <LoginPage />
          </RoleGuard>
        }
      />
      <Route
        path={RoutePath.Register}
        element={
          <RoleGuard allowedRoles={[]}>
            <Register />
          </RoleGuard>
        }
      />
      <Route
        path={`${RoutePath.Employee}/*`}
        element={
          <RoleGuard allowedRoles={[RoleEnum.Employee]}>
            <EmployeeRoute></EmployeeRoute>
          </RoleGuard>
        }
      ></Route>
      <Route
        path={RoutePath.Employer}
        element={
          <RoleGuard allowedRoles={[RoleEnum.Employer]}>
            <div>Employer Page - To be implemented</div>
          </RoleGuard>
        }
      ></Route>
      <Route path="*" element={<Navigate to={RoutePath.Login} replace />} />
    </Routes>
  );
};
