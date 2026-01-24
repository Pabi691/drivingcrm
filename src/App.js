import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Toaster } from 'react-hot-toast';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Orders, Calendar, Employees, Instructors, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Diary } from './pages';
import Login from './pages/Auth/Login';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Learners from './pages/Learners';
import UserProfilePage from './pages/UserProfilePage';
import InstructorProfilePage from './pages/InstructorProfilePage';
import LearnerProfilePage from './pages/LearnerProfilePage';
import LessonProfilePage from './pages/LessonProfilePage';
import Lessons from './pages/Lessons';
import Enquiries from './pages/Enquiries';
import PackageProfilePage from './pages/PackagePofilePage';
import Packages from './pages/Packages';
import EnquiryProfilePage from './pages/EnquiryProfilePage';
import Areas from './pages/Area';
import ProtectedRoute from './routes/ProtectedRoute';
import AreaView from './pages/AreaView';
import Pricing from './pages/Pricing';
// import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('authToken');

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' ;

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  let className = '';

  switch (true) {
    case isAuthPage:
      className = 'w-full min-h-screen bg-gray-100';
      break;
    case activeMenu:
      className = 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full';
      break;
    default:
      className = 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2';
  }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <Toaster position="top-right" />
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
        <div className={className}>
          {!isAuthPage && (
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
          )}
          <div>
            {!isAuthPage && themeSettings && <ThemeSettings />}

            {isAuthPage ? (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            ) : (
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Diary />)} />
                {/* <Route path="/ecommerce" element={(<Ecommerce />)} /> */}
                <Route path="/diary" element={(<Diary />)} />

                {/* Profile */}
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/instructors/:id" element={<InstructorProfilePage />} />
                <Route path="/learners/:id" element={<LearnerProfilePage />} />
                <Route path="/lessons/:id" element={
                  <ProtectedRoute roles={['admin', 'instructor']}>
                      <LessonProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/packages/:id" element={<PackageProfilePage />} />
                <Route path="/enquiries/:id" element={<EnquiryProfilePage />} />
                <Route path="/areas/:id" element={<AreaView />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/pupil" element={<Learners />} />
                <Route path="/enquiries" element={<Enquiries />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/areas" element={<Areas />} />
                <Route path="/pricing" element={<Pricing />} />

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
