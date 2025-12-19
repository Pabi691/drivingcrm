import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TEST_USERS = {
  admin: {
    email: 'admin@drivingschool.com',
    password: 'admin123',
  },
  instructor: {
    email: 'instructor@drivingschool.com',
    password: 'instructor123',
  },
  learner: {
    email: 'learner@drivingschool.com',
    password: 'learner123',
  },
};

export default function Login() {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = TEST_USERS[role];

    setTimeout(() => {
      if (email === user.email && password === user.password) {
        // ✅ Fake auth token
        const authKey = 'TEST_AUTH_KEY_123456';

        localStorage.setItem('authKey', authKey);
        localStorage.setItem('role', role);
        localStorage.setItem('userEmail', email);

        // 🔀 Redirect based on role
        if (role === 'admin') navigate('/');
        if (role === 'instructor') navigate('/diary');
        if (role === 'learner') navigate('/calendar');
      } else {
        setError('Invalid email or password');
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* <h1 className="text-2xl font-bold text-center mb-2">
          Driving School Login
        </h1> */}
        <img src="drive4passlogo.webp" alt="Drive4Pass Logo" className="w-20 h-20 mx-auto mb-4"/>
        <p className="text-sm text-gray-500 text-center mb-6">
          Admin • Instructor • Learner
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role */}
          <div>
            {/* <label htmlFor="role" className="block text-sm font-medium mb-1">
              Login As
            </label> */}
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="learner">Learner</option>
            </select>
          </div>

          {/* Email */}
          <div>
            {/* <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label> */}
            <input
              type="email"
              id="email"
              required
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Password */}
          <div>
            {/* <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label> */}
            <input
              type="password"
              placeholder="*************"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              autoComplete="off"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
