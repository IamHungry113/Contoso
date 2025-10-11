import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store';
import { createTicket } from '../../store/ticketSlice';

type CreateTicketForm = {
  date: string;
  amount: number;
  link: string;
  email: string;
  description: string;
};

export const CreateTicket = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateTicketForm>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    link: '',
    email: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      dispatch(
        createTicket({
          user: form.email,
          amount: form.amount,
          createdAt: new Date(form.date),
          description: form.description,
          link: form.link,
        })
      );
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-white">
      <div className="w-full max-w-md border border-gray-300 rounded-lg shadow-sm p-6 bg-white">
        <h2 className="text-2xl font-bold text-black text-center mb-6">创建购买记录</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">用户</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入邮箱"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">购买日期</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full text-black  border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">金额（元）</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              min={0.01}
              step={0.01}
              className="w-full border text-black  border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">相关链接</label>
            <input
              type="url"
              name="link"
              placeholder="https://example.com/item/123"
              value={form.link}
              onChange={handleChange}
              required
              className="w-full text-black  border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">购买说明</label>
            <textarea
              name="description"
              placeholder="例如：办公用品采购、午餐报销等"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full text-black  border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? '提交中...' : '创建'}
          </button>
        </form>
      </div>
    </div>
  );
};
