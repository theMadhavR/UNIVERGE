import { useState, useEffect, createContext, useContext } from 'react';

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

  // Mock authentication functions for development
  const signup = async (email, password, userData) => {
    console.log('Mock signup:', email, userData);
    const user = {
      uid: 'mock_user_' + Date.now(),
      email: email,
      ...userData
    };
    setCurrentUser(user);
    setUserProfile(userData);
    localStorage.setItem('auth_token', 'mock_token_' + user.uid);
    return { user };
  };

  const login = async (email, password) => {
    console.log('Mock login:', email);
    const user = {
      uid: 'mock_user_' + Date.now(),
      email: email,
      user_type: email.includes('alumni') ? 'alumni' : 'student'
    };
    setCurrentUser(user);
    localStorage.setItem('auth_token', 'mock_token_' + user.uid);
    return { user };
  };

  const loginWithGoogle = async () => {
    console.log('Mock Google login');
    const user = {
      uid: 'mock_google_user_' + Date.now(),
      email: 'user@gmail.com',
      displayName: 'Google User'
    };
    setCurrentUser(user);
    localStorage.setItem('auth_token', 'mock_google_token');
    return { user };
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('auth_token');
  };

  const updateUserProfile = async (profileData) => {
    if (currentUser) {
      const updatedProfile = { ...userProfile, ...profileData };
      setUserProfile(updatedProfile);
      return updatedProfile;
    }
  };

  useEffect(() => {
    // Check for existing auth on app start
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Mock user data
      const mockUser = {
        uid: 'mock_user_123',
        email: 'user@example.com',
        user_type: 'student'
      };
      setCurrentUser(mockUser);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    loginWithGoogle,
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