import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { SocketProvider } from './hooks/useSocket';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Matching from './components/Matching';
import CareerPathfinder from './components/CareerPathfinder';
import Storyboard from './components/Storyboard';
import ImpactTracker from './components/ImpactTracker';
import Chat from './components/Chat';

function ThemeApplier() {
  const { theme } = useTheme();
  const { userProfile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.documentElement.classList.remove('dark');
    } else {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, location.pathname]);

  useEffect(() => {
    const userType = userProfile?.user_type || 'student';
    if (userType === 'alumni') {
      document.documentElement.classList.add('theme-alumni');
      document.documentElement.classList.remove('theme-student');
    } else {
      document.documentElement.classList.add('theme-student');
      document.documentElement.classList.remove('theme-alumni');
    }
  }, [userProfile]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <ThemeApplier />
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/matching" element={<Layout><Matching /></Layout>} />
                <Route path="/career-pathfinder" element={<Layout><CareerPathfinder /></Layout>} />
                <Route path="/storyboard" element={<Layout><Storyboard /></Layout>} />
                <Route path="/impact" element={<Layout><ImpactTracker /></Layout>} />
                <Route path="/chat" element={<Layout><Chat /></Layout>} />
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </div>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;