import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Import pages
import LoginPage from './pages/auth/login';
import DashboardPage from './pages/dashboard/dashboard';
import InstructorsPage from './pages/admin/instructors';
import LearnersPage from './pages/admin/learners';
import EnquiriesPage from './pages/admin/enquiries';
import LessonsPage from './pages/admin/lessons';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }


  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage onLoginSuccess={(u) => setUser(u)} />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={<DashboardPage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/admin/instructors"
              element={<InstructorsPage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/admin/learners"
              element={<LearnersPage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/admin/enquiries"
              element={<EnquiriesPage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/admin/lessons"
              element={<LessonsPage user={user} onLogout={handleLogout} />}
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
