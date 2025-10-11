import { Navigate, Route, Routes } from 'react-router';
import { RoutePath } from '../routePath';
import { CreateTicket } from './createTickets';
import { TicketList } from './ticketsList';

export const EmployeeRoute = () => {
  console.log('test');
  return (
    <Routes>
      <Route path={RoutePath.createTickets} element={<CreateTicket></CreateTicket>}></Route>
      <Route path={RoutePath.ticketList} element={<TicketList></TicketList>}></Route>
      <Route
        path="*"
        element={<Navigate to={`${RoutePath.Employee}/${RoutePath.ticketList}`}></Navigate>}
      ></Route>
    </Routes>
  );
};
