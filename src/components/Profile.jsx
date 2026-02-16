import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { 
  Save, 
  MapPin, 
  Languages, 
  GraduationCap, 
  Briefcase,
  Award,
  Home,
  School
} from 'lucide-react';

const Profile = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      bio: '',
      background: {
        first_generation: false,
        rural_background: false,
        low_income: false,
        underrepresented: false
      },
      location: {
        hometown: '',
        state: '',
        country: '',
        region: ''
      },
      education_level: '',
      current_school: '',
      major: '',
      graduation_year: '',
      career_interests: [],
      skills: [],
      ...userProfile
    }
  });

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [userProfile, reset]);

  const isAlumni = userProfile?.user_type === 'alumni';

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateUserProfile(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const backgroundOptions = [
    { id: 'first_generation', label: 'First Generation College Student' },
    { id: 'rural_background', label: 'Rural Background' },
    { id: 'low_income', label: 'Low Income Background' },
    { id: 'underrepresented', label: 'Underrepresented Group' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
            <p className="text-gray-600 mt-1">
              {isAlumni 
                ? 'Share your experience and help guide the next generation'
                : 'Tell us about yourself to get personalized matches and guidance'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isAlumni ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {isAlumni ? 'Alumni' : 'Student'}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                {...register('first_name', { required: 'First name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.first_name && (
                <p className="text-red-600 text-sm mt-1">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                {...register('last_name', { required: 'Last name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.last_name && (
                <p className="text-red-600 text-sm mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              rows={3}
              {...register('bio')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself, your interests, and your goals..."
            />
          </div>
        </div>

        {/* Background */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Home className="h-5 w-5 mr-2 text-blue-600" />
            Background
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backgroundOptions.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={option.id}
                  {...register(`background.${option.id}`)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Location
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hometown</label>
              <input
                type="text"
                {...register('location.hometown')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your hometown"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <input
                type="text"
                {...register('location.state')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="State or province"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                {...register('location.country')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                {...register('location.region')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select region</option>
                <option value="north_america">North America</option>
                <option value="south_america">South America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;