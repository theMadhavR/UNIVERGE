import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { SocketProvider } from './hooks/useSocket';
import Home from './pages/Home';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Matching from './components/Matching';
import CareerPathfinder from './components/CareerPathfinder';
import Storyboard from './components/Storyboard';
import ImpactTracker from './components/ImpactTracker';
import Chat from './components/Chat';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/matching" element={<Matching />} />
              <Route path="/career-pathfinder" element={<CareerPathfinder />} />
              <Route path="/storyboard" element={<Storyboard />} />
              <Route path="/impact" element={<ImpactTracker />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;