// pages/EmployeePage.tsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets, createTicket, type Ticket } from '../../store/ticketSlice';
import type { RootState, AppDispatch } from '../../store';

export default function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets, loading } = useSelector((state: RootState) => state.tickets);
  const [form, setForm] = useState({ user: '', amount: 0, link: '' });

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTicket({ ...form, createdAt: new Date().toISOString() }));
    setForm({ user: '', amount: 0, link: '' });
  };

  return (
    <div>
      <h1>Employee Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="User"
          value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          required
        />
        <input
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <button type="submit">Create Ticket</button>
      </form>

      <h2>Tickets List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {tickets.map((t: Ticket) => (
            <li key={t.id}>
              {t.user} spent ${t.amount} at {new Date(t.createdAt).toLocaleString()}{' '}
              {t.link && <a href={t.link}>Link</a>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
