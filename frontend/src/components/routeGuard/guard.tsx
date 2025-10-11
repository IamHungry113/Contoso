// components/RoleGuard.tsx
import { useEffect } from 'react';
import type { JSX } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    console.log(user);
    if (!loading) {
      if (!user) {
        if (location.pathname !== RoutePath.Register) {
          navigate(RoutePath.Login, { replace: true });
        }
      } else if (!allowedRoles.includes(user.role as RoleEnum)) {
        // 越权访问，根据角色重定向
        if (user.role === RoleEnum.Employee) {
          navigate(RoutePath.Employee, { replace: true });
        } else if (user.role === RoleEnum.Employer) {
          navigate(RoutePath.Employer, { replace: true });
        }
      }
    }
  }, [user, loading, allowedRoles, navigate, location]);

  if (loading) return <div>Loading...</div>;

  return children;
}
