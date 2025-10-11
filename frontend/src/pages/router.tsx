import { Routes, Route } from 'react-router';
import { LoginPage } from './login/login';
import { Register } from './register/register';
import { EmployeePage } from './user/employee';
import { RoutePath } from './routePath';

export const Pages = () => {
  return (
    <Routes>
      <Route path={RoutePath.Login} element={<LoginPage />} />
      <Route path={RoutePath.Register} element={<Register />} />
      <Route path={RoutePath.Employee} element={<EmployeePage />}></Route>
      <Route path={RoutePath.Employer} element={<EmployeePage />}></Route>
    </Routes>
  );
};
