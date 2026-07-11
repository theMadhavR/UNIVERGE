import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Award, 
  MapPin, 
  TrendingUp,
  Download,
  Share2,
  Star,
  Target,
  Zap,
  Heart
} from 'lucide-react';

const ImpactTracker = () => {
  const { userProfile } = useAuth();
  const [impactData, setImpactData] = useState(null);
  const [timeRange, setTimeRange] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImpactData();
  }, [timeRange]);

  const fetchImpactData = async () => {
    setLoading(true);
    // Mock impact data based on user type
    setTimeout(() => {
      const isAlumni = userProfile?.user_type === 'alumni';
      
      if (isAlumni) {
        setImpactData({
          students_mentored: 12,
          hours_volunteered: 48,
          connection_requests: 8,
          success_stories: 3,
          regional_impact_score: 85,
          regional_impact: {
            hometown_matches: 4,
            region_matches: 8,
            language_matches: 6
          },
          engagement_score: 92,
          skills_taught: ['Career Planning', 'Interview Skills', 'Technical Skills', 'Networking'],
          milestones: [
            { type: 'first_mentorship', date: '2023-01-15', description: 'First student mentored' },
            { type: 'hours_milestone', date: '2023-06-20', description: 'Reached 25 mentorship hours' },
            { type: 'success_story', date: '2024-01-10', description: 'Student landed dream job' }
          ]
        });
      } else {
        setImpactData({
          alumni_connected: 5,
          skills_learned: ['Communication', 'Leadership', 'Technical Skills', 'Interview Preparation'],
          goals_achieved: 2,
          progress_percentage: 65,
          engagement_score: 78,
          mentorship_sessions: 8,
          career_advancements: [
            { type: 'skill_acquired', date: '2023-03-15', description: 'Mastered Python programming' },
            { type: 'connection_made', date: '2023-07-22', description: 'Connected with industry mentor' },
            { type: 'goal_achieved', date: '2024-01-05', description: 'Secured summer internship' }
          ]
        });
      }
      setLoading(false);
    }, 1000);
  };

  const downloadCertificate = async () => {
    alert('Impact certificate downloaded! 🎓\n\nThis would generate a verifiable PDF certificate in a real implementation.');
  };

  const shareImpact = () => {
    alert('Impact shared! 📢\n\n"Check out my mentorship impact on UniVerge - I\'ve helped guide the next generation of professionals!"');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading impact insights...</span>
      </div>
    );
  }

  const isAlumni = userProfile?.user_type === 'alumni';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              Impact Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {isAlumni 
                ? 'Track your mentorship impact and regional reach'
                : 'Monitor your progress and career development journey'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-750 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Time</option>
              <option value="yearly">This Year</option>
              <option value="monthly">This Month</option>
              <option value="weekly">This Week</option>
            </select>
            
            <button
              onClick={downloadCertificate}
              className="bg-gray-100 hover:bg-gray-250 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center text-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Certificate
            </button>
            
            <button
              onClick={shareImpact}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center text-sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Impact
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAlumni ? (
          <>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students Mentored</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.students_mentored || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2 this month
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours Volunteered</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.hours_volunteered || 0}
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-455 mt-3">Making a difference</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Stories</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.success_stories || 0}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm text-yellow-600 dark:text-yellow-450">
                <Star className="h-4 w-4 mr-1 fill-current" />
                Career milestones achieved
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Regional Impact</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.regional_impact_score || 0}%
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-455 mt-3">Local community reach</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alumni Connected</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.alumni_connected || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                Growing network
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Skills Learned</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.skills_learned?.length || 0}
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-455 mt-3">Through mentorship</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Goals Achieved</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.goals_achieved || 0}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                  <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm text-yellow-600 dark:text-yellow-450">
                <TrendingUp className="h-4 w-4 mr-1" />
                Making progress
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Progress</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {impactData?.progress_percentage || 0}%
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-455 mt-3">Career journey</p>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Impact (Alumni) */}
        {isAlumni && impactData?.regional_impact && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Regional Impact Breakdown
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Hometown Matches</span>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white mr-2">
                    {impactData.regional_impact.hometown_matches}
                  </span>
                  <div className="w-24 bg-gray-200 dark:bg-slate-850 rounded-full h-2">
                    <div 
                       className="bg-blue-600 h-2 rounded-full" 
                       style={{ width: `${(impactData.regional_impact.hometown_matches / Math.max(impactData.students_mentored, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Region Matches</span>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white mr-2">
                    {impactData.regional_impact.region_matches}
                  </span>
                  <div className="w-24 bg-gray-200 dark:bg-slate-850 rounded-full h-2">
                    <div 
                       className="bg-green-600 h-2 rounded-full" 
                       style={{ width: `${(impactData.regional_impact.region_matches / Math.max(impactData.students_mentored, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Language Matches</span>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white mr-2">
                    {impactData.regional_impact.language_matches}
                  </span>
                  <div className="w-24 bg-gray-200 dark:bg-slate-850 rounded-full h-2">
                    <div 
                       className="bg-yellow-600 h-2 rounded-full" 
                       style={{ width: `${(impactData.regional_impact.language_matches / Math.max(impactData.students_mentored, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Progress (Students) */}
        {!isAlumni && impactData?.skills_learned && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Skills Developed
            </h2>
            
            <div className="space-y-3">
              {impactData.skills_learned.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-slate-850 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, 70 + (index * 10))}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                      {Math.min(100, 70 + (index * 10))}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Score */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Engagement Score
          </h2>
          
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {impactData?.engagement_score || 0}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-450">Engagement</div>
                </div>
              </div>
              <div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-blue-600 border-t-transparent border-r-transparent transform -rotate-45"
                style={{ clipPath: `inset(0 0 0 0)` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-650 dark:text-gray-400 mt-4">
              {impactData?.engagement_score >= 90 
                ? 'Excellent engagement! Keep up the great work.'
                : impactData?.engagement_score >= 70
                ? 'Good engagement. You\'re making progress.'
                : 'Keep engaging with the platform to improve your score.'
              }
            </p>
          </div>
        </div>

        {/* Recent Milestones */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Recent Milestones
          </h2>
          
          <div className="space-y-3">
            {(isAlumni ? impactData?.milestones : impactData?.career_advancements)?.slice(0, 3).map((milestone, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-950 rounded-lg border border-gray-100 dark:border-slate-805">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{milestone.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(milestone.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Certificate Preview */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Your Impact Certificate</h2>
            <p className="text-blue-100">
              {isAlumni
                ? 'Download and share your mentorship impact certificate'
                : 'Download your career progress certificate'
              }
            </p>
          </div>
          <button
            onClick={downloadCertificate}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
        <div className="flex items-center justify-center mb-3">
          <Heart className="h-6 w-6 mr-2" />
          <h3 className="text-lg font-semibold">Making a Difference Together</h3>
        </div>
        <p className="text-green-100">
          {isAlumni
            ? 'Your mentorship is transforming lives and building stronger communities.'
            : 'Your progress inspires others and demonstrates the power of mentorship.'
          }
        </p>
      </div>
    </div>
  );
};

export default ImpactTracker;