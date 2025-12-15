import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Instructors, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Diary } from './pages';
import Login from './pages/Auth/Login';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Learners from './pages/Learners';
import UserProfilePage from './pages/UserProfilePage';
import InstructorProfilePage from './pages/InstructorProfilePage';
import LearnerProfilePage from './pages/LearnerProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('authKey');

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || !isLoggedIn;

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          {!isAuthPage && (
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent
                content="Settings"
                position="Top"
              >
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>

              </TooltipComponent>
            </div>
          )}
          {!isAuthPage && activeMenu && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          )}
          <div
            className={
              isAuthPage
                ? 'w-full min-h-screen bg-gray-100'
                : activeMenu
                  ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
                  : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
            }
          >
            {!isAuthPage && (
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            )}
            <div>
              {!isAuthPage && themeSettings && <ThemeSettings />}

              {!isLoggedIn ? (
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              ) : (
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/ecommerce" element={(<Ecommerce />)} />
                <Route path="/diary" element={(<Diary />)} />

                {/* Profile */}
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/instructors/:id" element={<InstructorProfilePage />} />
                <Route path="/learners/:id" element={<LearnerProfilePage />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/learners" element={<Learners />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />

              </Routes>
              )}
            </div>
            {!isAuthPage && <Footer />}
          </div>
        </div>
    </div>
  );
};

export default App;
