import { Routes, Route } from 'react-router';
import { LoginPage } from './login/login';
import { Register } from './register/register';
import { EmployeePage } from './user/employee';
import { RoutePath } from './routePath';
import RoleGuard from '../components/routeGuard/guard';
import { RoleEnum } from './register/enum';

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
        path={RoutePath.Employee}
        element={
          <RoleGuard allowedRoles={[RoleEnum.Employee]}>
            <EmployeePage />
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
    </Routes>
  );
};
