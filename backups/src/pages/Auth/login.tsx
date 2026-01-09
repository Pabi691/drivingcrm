import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

type Props = { onLoginSuccess: (user: any) => void };

export default function LoginPage({ onLoginSuccess }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const validate = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    setError(null);
    return true;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email,
        password,
      });

      const token = res.data?.token || res.data?.access_token || res.data?.accessToken;
      if (!token) throw new Error('No token returned from server');

      if (remember) localStorage.setItem('auth_token', token);
      else sessionStorage.setItem('auth_token', token);

      // Try getting profile, fallback if not available
      try {
        const profile = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onLoginSuccess(profile.data);
      } catch (err) {
        onLoginSuccess({ id: 0, name: email.split('@')[0], email, role: 'user' });
      }

      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold">DS</div>
            <div>
              <h1 className="text-2xl font-semibold">Driving School</h1>
              <p className="text-sm text-slate-500">Sign in to your admin dashboard</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 text-red-700 rounded">{error}</div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Email</label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="px-3 text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-1 block">Password</label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="px-3 text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="flex-1 px-3 py-2 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="px-3 text-slate-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a className="text-blue-600 hover:underline" href="#">Forgot password?</a>
            </div>

            <div>
              <button
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-60"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : null}
                <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account? <a className="text-blue-600 hover:underline" href="#">Contact admin</a>
          </div>
        </div>
      </div>
    </div>
  );
}
