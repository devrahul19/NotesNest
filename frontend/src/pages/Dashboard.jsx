import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Move CreateNoteModal outside of Dashboard component
const CreateNoteModal = ({ 
  isModalOpen, 
  setIsModalOpen, 
  newNote, 
  setNewNote, 
  handleCreateNote, 
  isSubmitting, 
  createError 
}) => (
  <AnimatePresence>
    {isModalOpen && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      >
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.8,
              y: -20
            },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 500
              }
            }
          }}
          className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Create New Note</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter note title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={newNote.category}
                onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              >
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={newNote.desc}
                onChange={(e) => setNewNote(prev => ({ ...prev, desc: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                placeholder="Write your note content..."
              />
            </div>

            {createError && (
              <div className="text-red-500 text-sm">{createError}</div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:bg-violet-300"
              onClick={handleCreateNote}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Note'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Add this component after the CreateNoteModal component and before the Dashboard function
const UpdateProfileModal = ({ 
  isOpen, 
  onClose, 
  userData, 
  onUpdate, 
  isUpdating, 
  updateError 
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.8,
              y: -20
            },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 500
              }
            }
          }}
          className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          <form onSubmit={onUpdate} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                defaultValue={userData?.username}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={userData?.email}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {updateError && (
              <div className="text-red-500 text-sm">{updateError}</div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
                disabled={isUpdating}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:bg-violet-300"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

function Dashboard() {
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isNotesLoading, setIsNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    desc: '',
    category: 'Programming'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [stats, setStats] = useState({
    totalNotes: 0,
    categories: {}
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/user/getuser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // if you're using Authorization header
            'Content-Type': 'application/json'
        },
          credentials: 'include'
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user data');
        }

        setUserData(data);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('unauthorized') || err.message.includes('Invalid token')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      setIsNotesLoading(true);
      setNotesError(null);
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/blogs/allnotes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch notes');
      }

      // Filter notes to only show the current user's notes
      const userNotes = data.notes.filter(note => 
        note.authorId?._id === userData?._id
      );

      setNotes(userNotes);

      // Calculate stats from user's notes only
      const categoryCount = userNotes.reduce((acc, note) => {
        acc[note.category] = (acc[note.category] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalNotes: userNotes.length,
        categories: categoryCount
      });

    } catch (err) {
      console.error('Fetch notes error:', err);
      setNotesError(err.message);
    } finally {
      setIsNotesLoading(false);
    }
  };

  // Update useEffect to fetch notes after user data is loaded
  useEffect(() => {
    if (userData) {
      fetchNotes();
    }
  }, [userData]); // Depend on userData instead of empty array

  const statsItems = [
    { label: 'Total Notes', value: stats.totalNotes.toString(), icon: '📝' },
    { label: 'Categories', value: Object.keys(stats.categories).length.toString(), icon: '🏷️' }
    // { label: 'Bookmarks', value: '12', icon: '🔖' },
    // { label: 'Comments', value: '45', icon: '💬' },
  ];


  // Modal for viewing note content
  const NoteModal = ({ note, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
              <p className="text-sm text-violet-600 mt-1">{note.category}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">{note.content}</p>
        </div>
        <div className="px-6 py-4 bg-gray-50 text-right">
          <p className="text-sm text-gray-500">{note.date}</p>
        </div>
      </motion.div>
    </motion.div>
  );

  const handleCreateNote = async () => {
    try {
      setIsSubmitting(true);
      setCreateError(null);
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/blogs/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create note');
      }

      // Reset form and close modal
      setNewNote({
        title: '',
        desc: '',
        category: 'Programming'
      });
      setIsModalOpen(false);
      
      // Refresh notes list
      fetchNotes();

    } catch (err) {
      setCreateError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this new function to handle profile updates
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);

    const formData = new FormData(e.target);
    const updates = {
        username: formData.get('username').trim(),
        email: formData.get('email').trim()
    };

    // Only include password if it's not empty
    const password = formData.get('password');
    if (password && password.trim()) {
        updates.password = password;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/user/update/${userData._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
        }

        const data = await response.json();
        setUserData(data);
        setIsProfileModalOpen(false);
        alert('Profile updated successfully!');
        
    } catch (err) {
        console.error('Update error:', err);
        setUpdateError(err.message || 'Failed to update profile');
    } finally {
        setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <svg className="animate-spin h-8 w-8 text-violet-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200 max-w-md mx-4">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 pb-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-gray-200 px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="p-2 hover:bg-violet-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/notes')}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
            >
              Browse Notes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="px-4 py-2 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* User Profile Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
                {userData?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData?.username || 'User'}</h2>
                <p className="text-gray-500 text-sm mt-1">{userData?.email}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileModalOpen(true)}
              className="px-4 py-2 text-violet-600 border border-violet-600 rounded-lg hover:bg-violet-50 transition-colors"
            >
              Edit Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {statsItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Notes and Categories Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Notes */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Your Notes</h3>
            </div>
            <div className="p-4">
              {isNotesLoading ? (
                <div className="flex items-center justify-center p-8">
                  <svg className="animate-spin h-6 w-6 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : notesError ? (
                <div className="text-red-500 text-center p-4">
                  {notesError}
                </div>
              ) : notes.length === 0 ? (
                <div className="text-gray-500 text-center p-8">
                  No notes found. Create your first note!
                </div>
              ) : (
                notes.map((note) => (
                  <motion.div
                    key={note._id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNote(note)}
                    className="p-4 hover:bg-gray-50 rounded-lg transition-all cursor-pointer mb-2 last:mb-0"
                  >
                    <h4 className="font-medium text-gray-800">{note.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{note.desc}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-violet-600 text-xs font-medium">{note.category}</span>
                      <span className="text-gray-400 text-xs">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Categories Overview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Categories Overview</h3>
            </div>
            <div className="p-6">
              {Object.entries(stats.categories).map(([category, count], index) => (
                <motion.div
                  key={category}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-500">{count} notes</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / stats.totalNotes) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Note View Modal */}
      <AnimatePresence>
        {selectedNote && (
          <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
        )}
      </AnimatePresence>

      <CreateNoteModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newNote={newNote}
        setNewNote={setNewNote}
        handleCreateNote={handleCreateNote}
        isSubmitting={isSubmitting}
        createError={createError}
      />

      <UpdateProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={userData}
        onUpdate={handleUpdateProfile}
        isUpdating={isUpdating}
        updateError={updateError}
      />
    </motion.div>
  );
}

export default Dashboard;
