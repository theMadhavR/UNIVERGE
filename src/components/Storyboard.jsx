import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Save,
  Image,
  Star,
  TrendingUp
} from 'lucide-react';

const Storyboard = () => {
  const { userProfile, currentUser } = useAuth();
  const [storyboard, setStoryboard] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  useEffect(() => {
    fetchStoryboard();
  }, [currentUser]);

  const fetchStoryboard = async () => {
    setLoading(true);
    // Mock storyboard data
    setTimeout(() => {
      const mockStoryboard = {
        title: 'My Career Journey',
        description: 'From first-generation student to aspiring professional',
        timeline_items: [
          {
            item_id: '1',
            title: 'Started College',
            description: 'Began undergraduate studies in Computer Science as a first-generation student',
            year: 2020,
            type: 'education',
            location: 'Hometown, State',
            skills_gained: ['Time Management', 'Academic Writing', 'Basic Programming'],
            lessons_learned: 'Learned to navigate college systems independently and build support networks'
          },
          {
            item_id: '2',
            title: 'First Internship',
            description: 'Software development internship at local tech company',
            year: 2022,
            type: 'career',
            location: 'City, State',
            skills_gained: ['Python', 'Web Development', 'Team Collaboration'],
            lessons_learned: 'Gained real-world experience and built professional confidence'
          },
          {
            item_id: '3',
            title: 'Research Project',
            description: 'Led undergraduate research on machine learning applications',
            year: 2023,
            type: 'milestone',
            location: 'University Campus',
            skills_gained: ['Research Methodology', 'Data Analysis', 'Presentation Skills'],
            lessons_learned: 'Discovered passion for applied research and problem-solving'
          }
        ]
      };
      setStoryboard(mockStoryboard);
      setLoading(false);
    }, 1000);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const storyboardData = {
        title: data.title || 'My Career Journey',
        description: data.description,
        timeline_items: storyboard?.timeline_items || []
      };

      // Mock save
      setTimeout(() => {
        setStoryboard(storyboardData);
        setSaving(false);
        alert('Storyboard saved successfully!');
      }, 500);
    } catch (error) {
      console.error('Storyboard save error:', error);
      alert('Failed to save storyboard');
      setSaving(false);
    }
  };

  const onSubmitItem = async (data) => {
    const newItem = {
      item_id: editingItem?.item_id || Date.now().toString(),
      title: data.title,
      description: data.description,
      year: parseInt(data.year),
      type: data.type,
      location: data.location,
      skills_gained: data.skills_gained?.split(',').map(s => s.trim()).filter(s => s) || [],
      lessons_learned: data.lessons_learned
    };

    const updatedItems = editingItem
      ? storyboard.timeline_items.map(item => 
          item.item_id === editingItem.item_id ? newItem : item
        )
      : [...(storyboard.timeline_items || []), newItem];

    const updatedStoryboard = {
      ...storyboard,
      timeline_items: updatedItems.sort((a, b) => b.year - a.year)
    };

    setStoryboard(updatedStoryboard);
    setEditingItem(null);
    setShowAddForm(false);
    reset();

    alert(editingItem ? 'Item updated!' : 'Item added!');
  };

  const deleteItem = async (itemId) => {
    const updatedItems = storyboard.timeline_items.filter(item => item.item_id !== itemId);
    const updatedStoryboard = { ...storyboard, timeline_items: updatedItems };
    setStoryboard(updatedStoryboard);
    alert('Item deleted');
  };

  const editItem = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
    reset({
      title: item.title,
      description: item.description,
      year: item.year,
      type: item.type,
      location: item.location,
      skills_gained: item.skills_gained?.join(', '),
      lessons_learned: item.lessons_learned
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setShowAddForm(false);
    reset();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'career':
        return <Briefcase className="h-5 w-5" />;
      case 'milestone':
        return <Award className="h-5 w-5" />;
      case 'challenge':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'education':
        return 'bg-blue-100 text-blue-600';
      case 'career':
        return 'bg-green-100 text-green-600';
      case 'milestone':
        return 'bg-purple-100 text-purple-600';
      case 'challenge':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading your storyboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Career Storyboard</h1>
            <p className="text-gray-600 mt-1">
              Build your career journey timeline and share your experiences
            </p>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storyboard Form */}
        <div className="lg:col-span-1">
          {(showAddForm || editingItem) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingItem ? 'Edit Milestone' : 'Add New Milestone'}
              </h2>

              <form onSubmit={handleSubmit(onSubmitItem)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Graduated College, Started First Job"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    {...register('description')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe this milestone..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                  <input
                    type="number"
                    {...register('year', { 
                      required: 'Year is required',
                      min: { value: 1900, message: 'Year must be after 1900' },
                      max: { value: 2100, message: 'Year must be before 2100' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2023"
                  />
                  {errors.year && (
                    <p className="text-red-600 text-sm mt-1">{errors.year.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    {...register('type', { required: 'Type is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="education">Education</option>
                    <option value="career">Career</option>
                    <option value="milestone">Milestone</option>
                    <option value="challenge">Challenge</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    {...register('location')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills Gained</label>
                  <input
                    type="text"
                    {...register('skills_gained')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Leadership, Programming, Communication"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple skills with commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lessons Learned</label>
                  <textarea
                    rows={2}
                    {...register('lessons_learned')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What did you learn from this experience?"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center flex-1 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? 'Update' : 'Add'} Milestone
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="lg:col-span-3">
          {/* Storyboard Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storyboard Title</label>
                <input
                  type="text"
                  {...register('title')}
                  defaultValue={storyboard?.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
                  placeholder="My Career Journey"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  {...register('description')}
                  defaultValue={storyboard?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share the story of your career journey..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Storyboard
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Timeline Items */}
          <div className="space-y-6">
            {storyboard?.timeline_items && storyboard.timeline_items.length > 0 ? (
              storyboard.timeline_items.map((item, index) => (
                <div key={item.item_id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {item.year}
                          </div>
                          {item.location && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {item.location}
                            </div>
                          )}
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)} capitalize`}>
                            {item.type}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => editItem(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.item_id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                  )}

                  {item.lessons_learned && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        Lessons Learned
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.lessons_learned}</p>
                    </div>
                  )}

                  {item.skills_gained && item.skills_gained.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        Skills Gained
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.skills_gained.map((skill, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Storyboard is Empty</h3>
                <p className="text-gray-600 mb-6">
                  Start building your career journey timeline by adding your first milestone.
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center mx-auto transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Milestone
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storyboard;