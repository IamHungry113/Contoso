import { Routes, Route } from 'react-router';
import { Login } from './login/login';

export const Pages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
