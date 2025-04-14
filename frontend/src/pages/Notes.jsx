import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Notes() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState(null);
  const [stats, setStats] = useState({
    totalNotes: 0,
    categories: {}
  });
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setNotesError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:4000/blogs/allnotes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();
      console.log("API Response:", data); // For debugging

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch notes');
      }

      // Set the notes from the response
      setNotes(data.notes);

      // Calculate categories and their counts
      const categoryCount = data.notes.reduce((acc, note) => {
        acc[note.category] = (acc[note.category] || 0) + 1;
        return acc;
      }, {});

      // Update stats with calculated values
      setStats({
        totalNotes: data.notes.length,
        categories: categoryCount
      });

    } catch (err) {
      console.error('Error fetching notes:', err);
      setNotesError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add useEffect for fetching notes
  useEffect(() => {
    fetchNotes();
  }, []);

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

  useEffect(() => {
    // Fetch comments for all notes
    const fetchComments = async () => {
      const token = localStorage.getItem('token');
      const commentPromises = notes.map(async (note) => {
        try {
          const response = await fetch(`http://localhost:4000/blogs/${note._id}/comments`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          return { noteId: note._id, comments: data.comments || [] };
        } catch (err) {
          console.error(`Error fetching comments for note ${note._id}:`, err);
          return { noteId: note._id, comments: [] };
        }
      });

      const results = await Promise.all(commentPromises);
      const commentMap = {};
      results.forEach(({ noteId, comments }) => {
        commentMap[noteId] = comments;
      });
      setComments(commentMap);
    };

    if (notes.length > 0) {
      fetchComments();
    }
  }, [notes]);

  const handleCommentSubmit = async (noteId, e) => {
    e.preventDefault();
    const commentText = commentInputs[noteId];
    if (!commentText?.trim()) return;

    setIsSubmittingComment(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/blogs/${noteId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText })
      });

      if (!response.ok) throw new Error('Failed to post comment');

      // Clear input and refresh comments
      setCommentInputs(prev => ({ ...prev, [noteId]: '' }));
      
      // Optimistically update comments
      const newComment = {
        text: commentText,
        userId: { username: userInitial || 'You' },
        createdAt: new Date().toISOString()
      };
      
      setComments(prev => ({
        ...prev,
        [noteId]: [...(prev[noteId] || []), newComment]
      }));

    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

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

      {/* Main content - Only Notes */}
      <div className="max-w-3xl mx-auto px-4 py-4 pb-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          </div>
        ) : notesError ? (
          <div className="text-center py-12 text-red-500">
            {notesError}
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No notes found. Create your first note!
          </div>
        ) : (
          <motion.div layout className="space-y-6">
            {notes.map((note) => (
              <motion.article
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Post header */}
                <div className="flex items-center p-4 border-b border-gray-50">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg"
                  >
                    {note.authorId?.username?.[0] || 'U'}
                  </motion.div>
                  <div className="ml-3 flex-grow">
                    <p className="font-semibold text-gray-800">{note.authorId?.username || 'Unknown User'}</p>
                    <p className="text-xs text-violet-500 font-medium">{note.category}</p>
                  </div>
                </div>

                {/* Post content */}
                <div className="px-4 py-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-violet-600 transition-colors">
                    {note.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{note.desc}</p>

                  {/* PDF attachment if available */}
                  {note.pdfUrl && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <a 
                        href={note.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-violet-600 hover:text-violet-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm font-medium">View PDF</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Comments section */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">
                      Comments ({comments[note._id]?.length || 0})
                    </span>
                  </div>
                  
                  {/* Comment form */}
                  <form onSubmit={(e) => handleCommentSubmit(note._id, e)} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={commentInputs[note._id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({
                        ...prev,
                        [note._id]: e.target.value
                      }))}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                      disabled={isSubmittingComment}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
                      disabled={isSubmittingComment || !commentInputs[note._id]?.trim()}
                    >
                      {isSubmittingComment ? '...' : 'Post'}
                    </button>
                  </form>

                  {/* Comments list */}
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {comments[note._id]?.map((comment, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-medium">
                          {comment.userId?.username?.[0] || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium text-gray-800">
                              {comment.userId?.username || 'Unknown User'}
                            </span>
                            <span className="text-gray-600 ml-2">{comment.text}</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post footer with date */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    Posted on {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Notes;
