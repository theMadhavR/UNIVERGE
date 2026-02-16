import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('auth_token') || 'mock_student_123';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock API functions for development
export const createUserProfile = async (profileData) => {
  console.log('Mock create profile:', profileData);
  return { data: { ...profileData, profile_completed: true, profile_score: 85 } };
};

export const getUserProfile = async (userId) => {
  console.log('Mock get profile:', userId);
  return { 
    data: { 
      user_id: userId,
      first_name: 'Mock',
      last_name: 'User',
      user_type: 'student',
      profile_completed: true,
      profile_score: 75
    } 
  };
};

export const getAlumniMatches = async (limit = 10) => {
  console.log('Mock get alumni matches');
  const mockMatches = Array.from({ length: limit }, (_, i) => ({
    alumni_id: `mock_alumni_${i}`,
    student_id: 'mock_student',
    overall_score: (0.5 + Math.random() * 0.5).toFixed(3),
    background_score: (0.4 + Math.random() * 0.5).toFixed(3),
    location_score: (0.3 + Math.random() * 0.6).toFixed(3),
    interest_score: (0.5 + Math.random() * 0.4).toFixed(3),
    skill_score: (0.4 + Math.random() * 0.5).toFixed(3),
    career_score: (0.6 + Math.random() * 0.3).toFixed(3),
    matching_factors: [
      'Similar educational background',
      'Shared career interests',
      'Compatible skill sets'
    ],
    recommended: Math.random() > 0.3
  }));
  return { data: { matches: mockMatches } };
};

export const requestConnection = async (alumniId) => {
  console.log('Mock request connection to:', alumniId);
  return { data: { message: 'Connection request sent successfully' } };
};

export const getCareerGuidance = async (careerData) => {
  console.log('Mock career guidance:', careerData);
  return {
    data: {
      recommendations: {
        recommended_paths: ['Software Engineer', 'Data Scientist', 'Product Manager'],
        confidence_score: 0.85,
        reasoning: ['Based on your technical interests and background'],
        required_skills: ['Programming', 'Problem Solving', 'Communication'],
        suggested_courses: ['Python Fundamentals', 'Data Structures', 'Web Development'],
        timeline: '2-3 years',
        note: 'Mock AI recommendations for development'
      }
    }
  };
};

export const getImpactData = async () => {
  console.log('Mock impact data');
  return {
    data: {
      students_mentored: 5,
      hours_volunteered: 20,
      alumni_connected: 3,
      progress_percentage: 65,
      engagement_score: 78
    }
  };
};

export const getImpactCertificate = async (period = 'all') => {
  console.log('Mock impact certificate');
  return {
    data: {
      certificate_id: 'mock_cert_123',
      user_id: 'mock_user',
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
  console.log('Mock create storyboard:', storyboardData);
  return {
    data: {
      storyboard_id: 'mock_storyboard_123',
      ...storyboardData,
      created_at: new Date().toISOString()
    }
  };
};

export const getStoryboard = async (userId) => {
  console.log('Mock get storyboard:', userId);
  return {
    data: {
      storyboard_id: 'mock_storyboard_123',
      user_id: userId,
      title: 'My Career Journey',
      description: 'This is a mock storyboard',
      timeline_items: [],
      created_at: new Date().toISOString()
    }
  };
};

export default api;