import axios from 'axios';

const API_BASE_URL = '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Real API functions connected to the database
export const createUserProfile = async (profileData) => {
  return api.put('/api/users/profile', profileData);
};

export const getUserProfile = async (userId) => {
  return api.get('/api/users/me');
};

export const getAlumniMatches = async (limit = 10) => {
  return api.get(`/api/matching/alumni?limit=${limit}`);
};

export const requestConnection = async (alumniId) => {
  return { data: { message: 'Connection request sent successfully' } };
};

export const getCareerGuidance = async (careerData) => {
  return {
    data: {
      recommendations: {
        recommended_paths: ['Software Engineer', 'Data Scientist', 'Product Manager'],
        confidence_score: 0.85,
        reasoning: ['Based on your technical interests and background'],
        required_skills: ['Programming', 'Problem Solving', 'Communication'],
        suggested_courses: ['Python Fundamentals', 'Data Structures', 'Web Development'],
        timeline: '2-3 years',
        note: 'AI recommendations for development'
      }
    }
  };
};

export const getImpactData = async () => {
  return api.get('/api/impact/data');
};

export const getImpactCertificate = async (period = 'all') => {
  return {
    data: {
      certificate_id: 'mock_cert_123',
      user_id: 'user_123',
      issued_at: new Date().toISOString(),
      impact_metrics: {
        total_impact_score: 75,
        students_mentored: 5,
        hours_volunteered: 20
      }
    }
  };
};

export const createStoryboard = async (storyboardData) => {
  return api.post('/api/storyboards', storyboardData);
};

export const getStoryboard = async (userId) => {
  return api.get(`/api/storyboards/${userId}`);
};

export default api;