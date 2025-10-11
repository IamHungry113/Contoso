import { TicketList } from '../employee/ticketsList';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../routePath';
import type { RouteObject } from 'react-router';

export const employerRoutes: RouteObject[] = [
  {
    index: true,
    path: RoutePath.ticketList,
    element: <TicketList />,
    handle: { title: 'Ticket List' },
  },
  {
    path: '*',
    element: <Navigate to={RoutePath.ticketList} replace />,
    handle: { title: 'Redirecting...' },
  },
];
