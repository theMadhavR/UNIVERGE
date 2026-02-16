import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Compass, 
  TrendingUp, 
  MessageCircle, 
  Calendar,
  ArrowRight,
  Star,
  MapPin,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const Dashboard = () => {
  const { userProfile } = useAuth();
  const [matches, setMatches] = useState([]);
  const [impactData, setImpactData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data loading
    setLoading(true);
    setTimeout(() => {
      setMatches([
        {
          alumni_id: 'mock_1',
          overall_score: 0.85,
          background_score: 0.8,
          location_score: 0.9,
          interest_score: 0.7,
          skill_score: 0.8,
          career_score: 0.9,
          matching_factors: ['Same hometown', 'Similar background', 'Shared interests']
        },
        {
          alumni_id: 'mock_2', 
          overall_score: 0.72,
          background_score: 0.9,
          location_score: 0.6,
          interest_score: 0.8,
          skill_score: 0.7,
          career_score: 0.6,
          matching_factors: ['First-generation students', 'Similar career goals']
        }
      ]);
      setImpactData({
        students_mentored: 5,
        alumni_connected: 3,
        progress_percentage: 65,
        engagement_score: 78
      });
      setLoading(false);
    }, 1000);
  }, []);

  const isAlumni = userProfile?.user_type === 'alumni';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userProfile?.first_name || 'there'}! 👋
        </h1>
        <p className="text-blue-100">
          {isAlumni 
            ? 'Continue making an impact by mentoring the next generation.'
            : 'Your journey to career success starts here. Connect with alumni who understand your background.'
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connections</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {impactData?.alumni_connected || impactData?.students_mentored || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {impactData?.progress_percentage || 0}%
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meetings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {isAlumni ? 'Students You Can Help' : 'Recommended Alumni'}
            </h2>
            <Link 
              to="/matching" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {matches.map((match, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  {isAlumni ? (
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  ) : (
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {isAlumni ? `Student ${index + 1}` : `Alumni ${index + 1}`}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {match.location_score > 0.7 ? 'Same Region' : 'Different Region'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(match.overall_score * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Career Pathfinder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Career Pathfinder</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get AI-powered career guidance based on your background
                </p>
              </div>
            </div>
            <Link 
              to="/career-pathfinder" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4 flex items-center justify-center"
            >
              Explore Career Paths <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          {/* Impact Tracker */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Impact Tracker</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isAlumni 
                    ? 'Track your mentorship impact and achievements'
                    : 'Monitor your progress and career milestones'
                  }
                </p>
              </div>
            </div>
            <Link 
              to="/impact" 
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors mt-4 flex items-center justify-center"
            >
              View Insights <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;