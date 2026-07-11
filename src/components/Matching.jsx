import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Users, 
  MapPin, 
  Star, 
  Filter, 
  MessageCircle,
  GraduationCap,
  Briefcase,
  Award,
  Heart
} from 'lucide-react';

const Matching = () => {
  const { userProfile } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minScore: 70,
    location: '',
    industry: '',
    background: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load mock matches
    setLoading(true);
    setTimeout(() => {
      const mockMatches = [
        {
          alumni_id: 'alumni_1',
          student_id: 'student_1',
          overall_score: 0.92,
          background_score: 0.95,
          location_score: 0.90,
          interest_score: 0.85,
          skill_score: 0.88,
          career_score: 0.95,
          matching_factors: ['Same hometown', 'Both first-generation students', 'Shared career interests in Technology'],
          connection_status: 'available'
        },
        {
          alumni_id: 'alumni_2',
          student_id: 'student_1', 
          overall_score: 0.78,
          background_score: 0.85,
          location_score: 0.65,
          interest_score: 0.82,
          skill_score: 0.75,
          career_score: 0.80,
          matching_factors: ['Similar rural background', 'Compatible skill sets', 'Matching professional interests'],
          connection_status: 'available'
        },
        {
          alumni_id: 'alumni_3',
          student_id: 'student_1',
          overall_score: 0.65,
          background_score: 0.70,
          location_score: 0.55,
          interest_score: 0.72,
          skill_score: 0.68,
          career_score: 0.60,
          matching_factors: ['Shared educational background', 'Alumni has relevant industry experience'],
          connection_status: 'available'
        }
      ];
      setMatches(mockMatches);
      setLoading(false);
    }, 1500);
  }, []);

  const handleRequestConnection = async (alumniId) => {
    // Mock connection request
    setMatches(prev => prev.map(match => 
      match.alumni_id === alumniId 
        ? { ...match, connection_status: 'pending' }
        : match
    ));
    alert('Connection request sent successfully!');
  };

  const filteredMatches = matches.filter(match => {
    if (match.overall_score * 100 < filters.minScore) return false;
    if (filters.location && match.location_score < 0.5) return false;
    return true;
  });

  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950/40';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-950/40';
    return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  const getScoreText = (score) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    return 'Fair Match';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-450">Finding your perfect matches...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              Alumni Matching
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Connect with alumni who share your background and can guide your career journey
            </p>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 hover:bg-gray-250 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-6 p-4 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Match Score</label>
                <select
                  value={filters.minScore}
                  onChange={(e) => setFilters(prev => ({ ...prev, minScore: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value={50}>50%+</option>
                  <option value={60}>60%+</option>
                  <option value={70}>70%+</option>
                  <option value={80}>80%+</option>
                  <option value={90}>90%+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location Match</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Any Location</option>
                  <option value="same">Same Region</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry</label>
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Any Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
                <select
                  value={filters.background}
                  onChange={(e) => setFilters(prev => ({ ...prev, background: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Any Background</option>
                  <option value="similar">Similar Background</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div key={match.alumni_id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow">
              {/* Match Score */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(match.overall_score)}`}>
                  {Math.round(match.overall_score * 100)}% Match
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {getScoreText(match.overall_score)}
                </div>
              </div>

              {/* Alumni Info */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-350">Senior Software Engineer at TechCorp</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Computer Science '18</p>
              </div>

              {/* Matching Factors */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-450 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {match.location_score > 0.7 ? 'Same Region' : 'Different'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-450 flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Background
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {Math.round(match.background_score * 100)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-450 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    Interests
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {Math.round(match.interest_score * 100)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-450 flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Skills
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {Math.round(match.skill_score * 100)}%
                  </span>
                </div>
              </div>

              {/* Matching Factors Highlights */}
              {match.matching_factors && match.matching_factors.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Why you're matched:</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {match.matching_factors.slice(0, 3).map((factor, idx) => (
                      <li key={idx} className="flex items-start">
                        <Heart className="h-3 w-3 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRequestConnection(match.alumni_id)}
                  disabled={match.connection_status === 'pending'}
                  className={`flex-1 ${
                    match.connection_status === 'pending' 
                      ? 'bg-gray-450 dark:bg-slate-750 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm`}
                >
                  {match.connection_status === 'pending' ? 'Request Sent' : 'Connect'}
                </button>
                
                <button className="bg-gray-100 hover:bg-gray-250 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-medium p-2 rounded-lg transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="h-16 w-16 text-gray-300 dark:text-gray-650 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matches found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters to see more matches.
            </p>
          </div>
        )}
      </div>

      {/* Match Breakdown */}
      {filteredMatches.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Matching Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">25%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Background Similarity</div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">20%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Location Match</div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">20%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interest Alignment</div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">20%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Skill Compatibility</div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">15%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Career Alignment</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matching;