import { useState } from 'react';
import { apiClient } from '../../api/client';
import { RoleEnum } from './enum';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(RoleEnum.Employee);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 简单校验逻辑
    if (!email || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }
    if (password !== confirmPassword) {
      setError('两次密码输入不一致');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('请输入正确的邮箱地址');
      return;
    }

    setError('');
    apiClient.post('/auth/register', { email, password, role, username: email });

    // TODO: 调用后端注册接口
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl text-black font-bold mb-6 text-center">注册</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 邮箱 */}
          <div>
            <label className="block text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入邮箱"
            />
          </div>

          {/* 密码 */}
          <div>
            <label className="block text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入密码"
            />
          </div>

          {/* 确认密码 */}
          <div>
            <label className="block text-gray-700 mb-1">确认密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请再次输入密码"
            />
          </div>

          {/* 角色选择 */}
          <div>
            <label className="block text-gray-700 mb-1">角色</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as RoleEnum)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={RoleEnum.Employee}>Employee</option>
              <option value={RoleEnum.Employer}>Employer</option>
            </select>
          </div>

          {/* 错误提示 */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* 注册按钮 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            注册
          </button>
        </form>
      </div>
    </div>
  );
};
