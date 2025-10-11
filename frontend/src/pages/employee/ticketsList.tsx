import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchTickets } from '../../store/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../routePath';
import { RoleEnum } from '../register/enum';

interface Ticket {
  id: number;
  user_id: number;
  amount: number;
  description?: string;
  status: 'open' | 'in-progress' | 'closed' | string;
  created_at: string;
  hidden: boolean;
}

export const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchTic = async () => {
      try {
        setLoading(true);
        const res = await dispatch(fetchTickets());
        setTickets(res.payload);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTic();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading tickets...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        className="px-3 py-1 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          navigate(`/${RoutePath.Employee}/${RoutePath.createTickets}`);
        }}
      >
        to create
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Ticket #{ticket.id}</h2>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-gray-700 mb-2">
                {ticket.description || 'No description provided'}
              </p>
              <p className="text-gray-500 text-sm mb-1">Amount: ${ticket.amount}</p>
              <p className="text-gray-400 text-xs">
                Created at: {new Date(ticket.created_at).toLocaleString()}
              </p>
            </div>
            {user?.role === RoleEnum.Employer && (
              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  approve
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  deny
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
