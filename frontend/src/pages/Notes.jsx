import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Notes() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  const [isLoading, setIsLoading] = useState(true);
  const [notes] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      author: 'John Doe',
      excerpt: 'Learn the basics of React and its core concepts...',
      date: '2024-01-15',
      category: 'Programming',
      readTime: '5 min read',
      likes: 234,
      comments: 45,
      bookmarks: 12,
    },
    // Add more sample notes
  ]);

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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();
        if (data.username) {
          setUserInitial(data.username.charAt(0).toUpperCase());
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
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

  // Modal backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Modal content variants
  const modalVariants = {
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
  };

  const CreateNoteModal = () => (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            variants={modalVariants}
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter note title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all">
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                  placeholder="Write your note content..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Create Note
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-gray-200 px-4 py-3"
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
            NotesNest
          </h1>
          <div className="flex items-center space-x-3">
            <motion.a
              href="/dashboard"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 hover:bg-violet-100 rounded-full transition-colors flex items-center justify-center"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-medium text-sm border-2 border-white shadow-md">
                {isLoading ? '...' : userInitial}
              </div>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Add the modal component */}
      <CreateNoteModal />

      {/* Enhanced Categories section */}
      {/* <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200 py-4 mb-4 overflow-x-auto">
        <div className="max-w-3xl mx-auto flex space-x-4 px-4">
          {['All', 'Programming', 'Design', 'Business', 'Technology'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                : 'bg-white text-gray-600 hover:bg-violet-50 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div> */}

      {/* Enhanced Main content */}
      <div className="max-w-3xl mx-auto px-4 py-4 pb-8">
        <motion.div layout className="space-y-6">
          {notes.map((note) => (
            <motion.article
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Post header with enhanced styling */}
              <div className="flex items-center p-4 border-b border-gray-50">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg"
                >
                  {note.author.charAt(0)}
                </motion.div>
                <div className="ml-3 flex-grow">
                  <p className="font-semibold text-gray-800">{note.author}</p>
                  <p className="text-xs text-violet-500 font-medium">{note.category}</p>
                </div>
                {/* <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-violet-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </motion.button> */}
              </div>

              {/* Enhanced Post content */}
              <div className="px-4 py-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-violet-600 transition-colors">
                  {note.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{note.excerpt}</p>
              </div>

              {/* Enhanced Action buttons */}
              {/* <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-medium">{note.likes}</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-medium">{note.comments}</span>
                    </motion.button>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </motion.button>
                </div>
              </div> */}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Notes;
