import { useState, useEffect, createContext, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, userData) => {
    const response = await api.post('/api/auth/register', {
      email,
      password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_type: userData.user_type
    });
    
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    setCurrentUser({ uid: user.id, email: user.email, user_type: user.user_type });
    setUserProfile(user);
    return { user };
  };

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    setCurrentUser({ uid: user.id, email: user.email, user_type: user.user_type });
    setUserProfile(user);
    if (user.theme) {
      localStorage.setItem('theme', user.theme);
      // Dispatch storage or custom event to force useTheme context update if needed
      window.dispatchEvent(new Event('theme-changed'));
    }
    return { user };
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('auth_token');
  };

  const updateUserProfile = async (profileData) => {
    const response = await api.put('/api/users/profile', profileData);
    const { user } = response.data;
    setUserProfile(user);
    return user;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await api.get('/api/users/me');
          const user = response.data;
          setCurrentUser({ uid: user.id, email: user.email, user_type: user.user_type });
          setUserProfile(user);
          if (user.theme) {
            localStorage.setItem('theme', user.theme);
          }
        } catch (err) {
          console.error("Session restoration failed:", err);
          // Token expired or invalid
          localStorage.removeItem('auth_token');
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    };
    
    fetchUser();
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}