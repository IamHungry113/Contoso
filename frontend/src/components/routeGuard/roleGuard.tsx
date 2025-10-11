import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../store';
import { RoleEnum } from '../../pages/register/enum';

interface Props {
  allowedRoles: RoleEnum[];
}

export const RoleGuard: React.FC<Props> = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state: RootState) => state.user);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    // 如果访问了不属于自己的页面，跳转到对应首页
    return <Navigate to={user.role === RoleEnum.Employee ? '/employee' : '/employer'} replace />;
  }

  return <Outlet />;
};
