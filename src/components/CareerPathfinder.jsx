import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { 
  Compass, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target,
  Clock,
  Star,
  ArrowRight,
  Zap,
  Lightbulb,
  Rocket
} from 'lucide-react';

const CareerPathfinder = () => {
  const { userProfile } = useAuth();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [insightsLoading, setInsightsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      career_goal: '',
      timeline: '2-3 years',
      priority: 'skill_development',
      challenges: []
    }
  });

  useEffect(() => {
    // Load initial insights when component mounts
    loadInitialInsights();
  }, []);

  const loadInitialInsights = async () => {
    if (!userProfile) return;
    
    setInsightsLoading(true);
    try {
      // Mock AI insights based on user profile
      setTimeout(() => {
        const mockRecommendations = {
          recommended_paths: ['Software Engineer', 'Data Scientist', 'Product Manager'],
          confidence_score: 0.87,
          reasoning: [
            "Based on your technical interests and problem-solving skills",
            "Your background shows strong analytical thinking abilities", 
            "The technology industry offers great growth opportunities for first-generation students"
          ],
          required_skills: ['Programming', 'Data Analysis', 'Problem Solving', 'Communication', 'Teamwork'],
          suggested_courses: ['Python Fundamentals', 'Data Structures & Algorithms', 'Web Development Bootcamp', 'Machine Learning Basics'],
          potential_alumni: ['Tech Industry Leader', 'Data Science Manager', 'Startup Founder'],
          timeline: '2-3 years',
          note: 'AI-powered insights based on your profile and goals'
        };
        setRecommendations(mockRecommendations);
        setInsightsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Career insights error:', error);
      setInsightsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Mock AI analysis based on form data
      setTimeout(() => {
        let paths, skills, courses;
        
        if (data.career_goal.toLowerCase().includes('tech') || data.career_goal.toLowerCase().includes('software')) {
          paths = ['Software Engineer', 'Full-Stack Developer', 'DevOps Engineer'];
          skills = ['JavaScript', 'Python', 'Cloud Computing', 'Agile Methodology'];
          courses = ['Advanced JavaScript', 'Cloud Certification', 'System Design'];
        } else if (data.career_goal.toLowerCase().includes('data') || data.career_goal.toLowerCase().includes('analyst')) {
          paths = ['Data Scientist', 'Business Analyst', 'Data Engineer'];
          skills = ['SQL', 'Python', 'Statistics', 'Data Visualization'];
          courses = ['Machine Learning', 'Big Data Technologies', 'Statistical Analysis'];
        } else if (data.career_goal.toLowerCase().includes('business') || data.career_goal.toLowerCase().includes('manager')) {
          paths = ['Product Manager', 'Business Analyst', 'Project Manager'];
          skills = ['Leadership', 'Strategic Planning', 'Communication', 'Analytical Thinking'];
          courses = ['Business Strategy', 'Project Management', 'Leadership Development'];
        } else {
          paths = ['Industry Professional', 'Specialized Consultant', 'Entrepreneurship'];
          skills = ['Adaptability', 'Networking', 'Problem Solving', 'Communication'];
          courses = ['Career Development', 'Industry Research', 'Professional Networking'];
        }

        const newRecommendations = {
          recommended_paths: paths,
          confidence_score: 0.82 + Math.random() * 0.15,
          reasoning: [
            `Your goal to become a ${data.career_goal} aligns well with current market trends`,
            `Based on your ${data.priority} focus, we recommend starting with foundational skills`,
            data.challenges.includes('Limited professional network') 
              ? 'Focus on building professional connections through alumni networking'
              : 'Your networking skills will be valuable in this career path'
          ],
          required_skills: skills,
          suggested_courses: courses,
          potential_alumni: ['Industry Expert', 'Senior Professional', 'Career Mentor'],
          timeline: data.timeline,
          note: 'Personalized recommendations based on your specific goals and challenges'
        };

        setRecommendations(newRecommendations);
        setLoading(false);
        alert('Career path updated successfully!');
      }, 1500);
    } catch (error) {
      console.error('Career pathfinder error:', error);
      alert('Failed to get career recommendations');
      setLoading(false);
    }
  };

  const challengesOptions = [
    'Limited professional network',
    'Lack of industry experience',
    'Unclear career direction',
    'Financial constraints',
    'Geographic limitations',
    'Imposter syndrome',
    'Work-life balance concerns'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Career Pathfinder</h1>
            <p className="text-gray-600 mt-1">
              AI-powered career guidance tailored to your background and goals
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Goals Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-600" />
              Your Career Goals
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Career Goal / Desired Role</label>
                <input
                  type="text"
                  {...register('career_goal', { required: 'Career goal is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Software Engineer, Marketing Manager"
                />
                {errors.career_goal && (
                  <p className="text-red-600 text-sm mt-1">{errors.career_goal.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                <select
                  {...register('timeline')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="6-12 months">6-12 months</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Priority</label>
                <select
                  {...register('priority')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="skill_development">Skill Development</option>
                  <option value="networking">Networking</option>
                  <option value="job_search">Job Search</option>
                  <option value="education">Education</option>
                  <option value="career_switch">Career Switch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Challenges You're Facing</label>
                <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                  {challengesOptions.map((challenge) => (
                    <label key={challenge} className="flex items-center">
                      <input
                        type="checkbox"
                        value={challenge}
                        {...register('challenges')}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{challenge}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Get Personalized Recommendations'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {insightsLoading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your profile for career insights...</p>
            </div>
          ) : recommendations ? (
            <>
              {/* Recommended Paths */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  Recommended Career Paths
                </h2>

                <div className="space-y-4">
                  {recommendations.recommended_paths?.map((path, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{path}</h3>
                        <div className="flex items-center text-sm text-yellow-600">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          {Math.round(recommendations.confidence_score * 100)}% Match
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          Timeline: {recommendations.timeline}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {recommendations.potential_alumni?.length || 0} Alumni Matches
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {recommendations.suggested_courses?.length || 0} Courses
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Development */}
              {recommendations.required_skills && recommendations.required_skills.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-purple-600" />
                    Skills to Develop
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recommendations.required_skills.map((skill, index) => (
                      <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Resources */}
              {recommendations.suggested_courses && recommendations.suggested_courses.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                    Learning Resources
                  </h2>

                  <div className="space-y-3">
                    {recommendations.suggested_courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div>
                          <h4 className="font-medium text-gray-900">{course}</h4>
                          <p className="text-sm text-gray-600 mt-1">Online Course / Workshop</p>
                        </div>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-1 px-3 rounded-lg text-sm flex items-center transition-colors">
                          Explore <ArrowRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insights */}
              {recommendations.reasoning && recommendations.reasoning.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
                    AI Career Insights
                  </h2>
                  
                  <div className="space-y-3">
                    {recommendations.reasoning.map((insight, index) => (
                      <p key={index} className="text-purple-800 text-sm leading-relaxed">
                        {insight}
                      </p>
                    ))}
                  </div>

                  {recommendations.note && (
                    <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                      <p className="text-purple-700 text-sm">{recommendations.note}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Rocket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Career Insights Yet</h3>
              <p className="text-gray-600 mb-6">
                Share your career goals to get personalized AI-powered recommendations based on your background.
              </p>
              <p className="text-sm text-gray-500">
                Complete the form to see your customized career path.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathfinder;