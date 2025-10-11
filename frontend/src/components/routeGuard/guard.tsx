// components/RoleGuard.tsx
import { useEffect } from 'react';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { RoleEnum } from '../../pages/register/enum';
import { RoutePath } from '../../pages/routePath';

interface Props {
  allowedRoles: RoleEnum[];
  children: JSX.Element;
}

export default function RoleGuard({ allowedRoles, children }: Props) {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // 未登录，重定向到登录页
        navigate(RoutePath.Login, { replace: true });
      } else if (!allowedRoles.includes(user.role as RoleEnum)) {
        // 越权访问，根据角色重定向
        if (user.role === RoleEnum.Employee) {
          navigate(RoutePath.Employee, { replace: true });
        } else if (user.role === RoleEnum.Employer) {
          navigate(RoutePath.Employer, { replace: true });
        }
      }
    }
  }, [user, loading, allowedRoles, navigate]);

  if (loading) return <div>Loading...</div>;

  return children;
}
